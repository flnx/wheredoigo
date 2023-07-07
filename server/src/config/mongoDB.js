const mongoose = require('mongoose');
const config = require('./config');

async function initializeDatabase() {
    try {
        await mongoose.connect(config.databaseUrl);
        console.info('Database connection successful.');
    } catch (err) {
        console.error('----- Error initializing database -----');
        console.error(err.message || err);
        process.exitCode = 1;
    }

    // Listen for termination signals and gracefully shut down the connection
    const shutdown = async () => {
        try {
            await mongoose.connection.close();
            process.exitCode = 0;
            console.info('Database connection closed.');
        } catch (err) {
            console.error(err.message || err);
            process.exitCode = 1;
        } 
    };

    process.on('SIGINT', shutdown); // Ctrl+C
    process.on('SIGTERM', shutdown); // Termination signal (Linux)
    process.on('SIGBREAK', shutdown); // Termination signal (Windows)
}

module.exports = initializeDatabase;
