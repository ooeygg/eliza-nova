// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'eliza-nova-backend',
        script: 'packages/core/dist/index.js',
        env_staging: {
          NODE_ENV: 'staging',
          PORT: 3000
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 3000
        },
        instances: 1,
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'staging'
        }
      }
    ]
  };