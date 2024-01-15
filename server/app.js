const express = require('express');
const cors = require('cors');

const initializeDatabase = require('./src/config/mongoDB');
const config = require('./src/config/config');
const routesConfig = require('./src/routes/routes');
const bodyParserErrorHandler = require('./src/middlewares/bodyParserErrorHandler');
const limiter = require('./src/config/rateLimiter');
const errorHandler = require('./src/middlewares/errorHandler');
const { cloudinaryConfig } = require('./src/config/cloudinary');
const { requireObjectBody } = require('./src/middlewares/requireObjectBody');

start();

async function start() {
    const app = express();

    const allowedOrigins = ['https://wheredoigo.onrender.com/'];
    const corsOptions = {
        origin: function (origin, callback) {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    };

    // Middlewares
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParserErrorHandler);
    app.use(express.urlencoded({ extended: true }));
    app.use(limiter);
    app.use(['PUT', 'POST'], requireObjectBody);

    cloudinaryConfig();
    routesConfig(app);
    await initializeDatabase();

    app.use(errorHandler);

    app.listen(config.port, () =>
        console.info(`Server listens on port ${config.port}`)
    );
}
