require('dotenv').config();

const config = {
    development: {
        port: process.env.DEV_PORT || 3000,
        databaseUrl: process.env.DATABASE_URI

    },
    production: {
        port: process.env.PROD_PORT,
        databaseUrl: process.env.DATABASE_URI
    },
}

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];