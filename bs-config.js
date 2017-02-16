var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    "port": 8000,
    "files": [
        "./webapp/**/*.{html,htm,css,js}",
        "./node_modules/**/*.{html,htm,css,js}"
    ],
    "server": {
        "baseDir": "webapp",
        "routes": {
            "/node_modules": "node_modules"
        },

        middleware: {
            1: proxyMiddleware('/api', {
                target: 'http://futurlogement5.azurewebsites.net',
                changeOrigin: true   // for vhosted sites, changes host header to match to target's host
            }),

            2: fallbackMiddleware({
                index: '/index.html',
                verbose: true
            })
        }
    }
};