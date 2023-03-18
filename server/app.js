const express = require('express');

const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

const initializeDatabase = require('./src/config/mongoDB');
const config = require('./src/config/config');

start();

async function start() {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use(authRoutes);

    await initializeDatabase();

    app.listen(config.port, () => console.log(`Server listens on port ${config.port}`));
}


