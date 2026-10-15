
const { createApp } = require("./src/app");

const PORT = process.env.PORT || 3000;

const app = createApp();

/**
 * Starts the HTTP server.
 *
 * @returns {import("node:http").Server} Running HTTP server.
 */
function startServer() {
    return app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

if (require.main === module) {
    startServer();
}

module.exports = { startServer };
