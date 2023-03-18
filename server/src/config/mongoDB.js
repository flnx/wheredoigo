const mongoose = require('mongoose');
const config = require('./config');

async function initializeDatabase() {
    try {
        await mongoose.connect(config.databaseUrl);
    } catch (err) {
        console.error('----- Error initializing database -----');
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = initializeDatabase;
