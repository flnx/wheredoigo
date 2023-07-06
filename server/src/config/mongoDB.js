const mongoose = require('mongoose');
const config = require('./config');

async function initializeDatabase() {
    try {
        await mongoose.connect(config.databaseUrl);
    } catch (err) {
        console.error('----- Error initializing database -----');
        console.error(err.message || err);
        process.exit(1);
    }

    // Listen for a SIGINT signal (Ctrl+C) and gracefully shut down the connection
    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            console.log('Database connection closed.');
            process.exit(0);
        } catch (err) {
            console.error(err.message || err);
            process.exit(1);
        }
    });
}

module.exports = initializeDatabase;
