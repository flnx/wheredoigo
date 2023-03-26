const express = require('express');
const cors = require('cors');

const initializeDatabase = require('./src/config/mongoDB');
const config = require('./src/config/config');
const routesConfig = require('./src/routes/routes');
const bodyParserErrorHandler = require('./src/middlewares/bodyParserErrorHandler');

start();

async function start() {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(bodyParserErrorHandler())
    // routes init
    routesConfig(app);

    // db init
    await initializeDatabase();

    app.listen(config.port, () =>
        console.log(`Server listens on port ${config.port}`)
    );
}