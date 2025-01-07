#!/bin/bash
# deploy.sh - Zero downtime deployment script for Nova app

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function for logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        error "Docker is not running or not accessible"
    fi
}

# Function to check if nginx is running
check_nginx() {
    if ! systemctl is-active --quiet nginx; then
        error "Nginx is not running"
    fi
}

# Function to get current deployment color
get_current_color() {
    local color=$(docker ps --filter "name=nova_app" --format "{{.Labels.color}}" | head -n1)
    if [ "$color" = "blue" ] || [ -z "$color" ]; then
        echo "blue"
    else
        echo "green"
    fi
}

# Function to get new deployment color
get_new_color() {
    local current_color=$1
    if [ "$current_color" = "blue" ]; then
        echo "green"
    else
        echo "blue"
    fi
}

# Function to wait for container health
wait_for_health() {
    local container=$1
    local max_attempts=30
    log "Waiting for container $container to be healthy..."

    for i in $(seq 1 $max_attempts); do
        if docker ps --filter "name=$container" --filter "health=healthy" | grep -q "$container"; then
            log "Container $container is healthy"
            return 0
        fi
        echo -n "."
        sleep 2
    done

    error "Container $container failed to become healthy after $max_attempts attempts"
}

# Function to update nginx configuration
update_nginx() {
    local new_color=$1
    local new_backend_port=$2
    local new_frontend_port=$3

    log "Updating nginx configuration..."

    # Create backup of nginx config
    sudo cp /etc/nginx/sites-available/novadova.com /etc/nginx/sites-available/novadova.com.backup

    # Update nginx configuration
    sudo sed -i "s/proxy_pass http:\/\/localhost:[0-9]*/proxy_pass http:\/\/localhost:${new_backend_port}/g" /etc/nginx/sites-available/novadova.com

    # Test nginx configuration
    if ! sudo nginx -t; then
        warn "Nginx configuration test failed. Rolling back..."
        sudo mv /etc/nginx/sites-available/novadova.com.backup /etc/nginx/sites-available/novadova.com
        error "Deployment failed: invalid nginx configuration"
    fi

    # Reload nginx
    sudo systemctl reload nginx
}

# Function to perform rollback
rollback() {
    local failed_color=$1
    local old_color=$2

    warn "Initiating rollback procedure..."

    # Restore old nginx configuration
    if [ -f "/etc/nginx/sites-available/novadova.com.backup" ]; then
        sudo mv /etc/nginx/sites-available/novadova.com.backup /etc/nginx/sites-available/novadova.com
        sudo systemctl reload nginx
    fi

    # Stop failed deployment
    COLOR=$failed_color docker-compose -f docker-compose.yml -f docker-compose.${failed_color}.yml down

    # Ensure old deployment is running
    if [ -n "$old_color" ]; then
        local old_backend_port=$([ "$old_color" = "blue" ] && echo "3000" || echo "3001")
        local old_frontend_port=$([ "$old_color" = "blue" ] && echo "5173" || echo "5174")

        COLOR=$old_color BACKEND_PORT=$old_backend_port FRONTEND_PORT=$old_frontend_port \
        docker-compose -f docker-compose.yml -f docker-compose.${old_color}.yml up -d
    fi

    error "Deployment failed and rollback completed. Please check the logs for more information."
}

# Main deployment logic
main() {
    log "Starting zero-downtime deployment..."

    # Perform initial checks
    check_docker
    check_nginx

    # Get deployment colors
    CURRENT_COLOR=$(get_current_color)
    NEW_COLOR=$(get_new_color $CURRENT_COLOR)

    # Set ports based on color
    if [ "$NEW_COLOR" = "blue" ]; then
        NEW_BACKEND_PORT=3000
        NEW_FRONTEND_PORT=5173
    else
        NEW_BACKEND_PORT=3001
        NEW_FRONTEND_PORT=5174
    fi

    log "Current deployment is $CURRENT_COLOR, deploying $NEW_COLOR..."

    # Pull latest changes
    log "Pulling latest changes..."
    if ! git pull origin main; then
        error "Failed to pull latest changes"
    fi

    # Build new image
    log "Building new image..."
    if ! docker-compose build --no-cache; then
        error "Failed to build new image"
    fi

    # Start new deployment
    log "Starting new $NEW_COLOR deployment..."
    COLOR=$NEW_COLOR BACKEND_PORT=$NEW_BACKEND_PORT FRONTEND_PORT=$NEW_FRONTEND_PORT \
    docker-compose -f docker-compose.yml -f docker-compose.${NEW_COLOR}.yml up -d

    # Wait for new deployment to be healthy
    wait_for_health "nova_app_${NEW_COLOR}"

    # Update nginx to point to new deployment
    update_nginx $NEW_COLOR $NEW_BACKEND_PORT $NEW_FRONTEND_PORT

    # Wait for nginx to stabilize
    sleep 5

    # Stop old deployment if it exists
    if [ -n "$CURRENT_COLOR" ]; then
        log "Stopping old $CURRENT_COLOR deployment..."
        COLOR=$CURRENT_COLOR docker-compose -f docker-compose.yml -f docker-compose.${CURRENT_COLOR}.yml down
    fi

    log "Deployment completed successfully!"
    log "New deployment is running on:"
    log "Backend: localhost:${NEW_BACKEND_PORT}"
    log "Frontend: localhost:${NEW_FRONTEND_PORT}"

    # Remove backup if everything went well
    if [ -f "/etc/nginx/sites-available/novadova.com.backup" ]; then
        sudo rm /etc/nginx/sites-available/novadova.com.backup
    fi
}

# Trap errors and perform rollback if needed
trap 'rollback $NEW_COLOR $CURRENT_COLOR' ERR

# Run main deployment
main