// PM2 Ecosystem Config — Production Process Manager
// Usage:
//   npm install -g pm2
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup   (auto-restart on server reboot)

module.exports = {
    apps: [
        {
            name: "portfolio",
            script: "node_modules/.bin/next",
            args: "start -p 3003",
            cwd: "./",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "512M",
            env: {
                NODE_ENV: "production",
                PORT: 3003,
            },
            error_file: "./logs/pm2-error.log",
            out_file: "./logs/pm2-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss",
        },
    ],
};
