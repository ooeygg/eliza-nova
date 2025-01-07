#!/bin/bash

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

# Get the current deployment color
get_current_color() {
    local color=$(docker ps --filter "name=nova_app" --format "{{.Labels.color}}" | head -n1)
    if [ "$color" = "blue" ] || [ -z "$color" ]; then
        echo "blue"
    else
        echo "green"
    fi
}

# Define base directories to mount
BASE_MOUNTS=(
    "characters:/app/characters"
    "shared/.env:/app/.env"
    "agent:/app/agent"
    "docs:/app/docs"
    "scripts:/app/scripts"
)

# Define package directories to mount
PACKAGES=(
    "adapter-postgres"
    "adapter-sqlite"
    "adapter-sqljs"
    "adapter-supabase"
    "client-auto"
    "client-direct"
    "client-discord"
    "client-farcaster"
    "client-telegram"
    "client-twitter"
    "core"
    "plugin-bootstrap"
    "plugin-image-generation"
    "plugin-node"
    "plugin-solana"
    "plugin-evm"
    "plugin-tee"
)

# Function to build the Docker mount command
build_mount_cmd() {
    local CMD=""

    # Add base mounts
    for mount in "${BASE_MOUNTS[@]}"; do
        CMD="$CMD -v \"$(pwd)/$mount\""
    done

    # Add package mounts
    for package in "${PACKAGES[@]}"; do
        CMD="$CMD -v \"$(pwd)/packages/$package/src:/app/packages/$package/src\""
    done

    # Add core types mount separately
    CMD="$CMD -v \"$(pwd)/packages/core/types:/app/packages/core/types\""

    echo "$CMD"
}

# Check if an argument is provided
if [ -z "$1" ]; then
    error "Usage: $0 {build|run|start|bash|deploy}"
fi

# Execute the corresponding command based on the argument
case "$1" in
    build)
        log "Building Docker image..."
        docker build --platform linux/amd64 -t novadova .
        ;;
    run)
        COLOR=${2:-blue}
        CURRENT_COLOR=$(get_current_color)

        if [ "$COLOR" = "$CURRENT_COLOR" ]; then
            warn "Container 'nova_app_$COLOR' is already running with this color."
            exit 1
        fi

        # Set ports based on color
        if [ "$COLOR" = "blue" ]; then
            BACKEND_PORT=3000
            FRONTEND_PORT=5173
        else
            BACKEND_PORT=3001
            FRONTEND_PORT=5174
        fi

        log "Starting $COLOR deployment..."

        # Build mount command
        MOUNT_CMD=$(build_mount_cmd)

        # Start container with color-specific configuration
        eval "docker-compose -f docker-compose.yml -f docker-compose.${COLOR}.yml up -d"

        log "Container 'nova_app_$COLOR' is running on:"
        log "Backend: localhost:${BACKEND_PORT}"
        log "Frontend: localhost:${FRONTEND_PORT}"
        ;;
    start)
        COLOR=${2:-$(get_current_color)}
        log "Starting container 'nova_app_$COLOR'..."
        docker-compose -f docker-compose.yml -f docker-compose.${COLOR}.yml start
        ;;
    bash)
        COLOR=${2:-$(get_current_color)}
        if [ "$(docker ps -q -f name=nova_app_${COLOR})" ]; then
            docker exec -it nova_app_${COLOR} bash
        else
            error "Container 'nova_app_$COLOR' is not running. Please start it first."
        fi
        ;;
    deploy)
        ./deploy.sh
        ;;
    *)
        error "Invalid option: $1\nUsage: $0 {build|run|start|bash|deploy}"
        ;;
esac