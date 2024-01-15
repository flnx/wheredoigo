require('dotenv').config();

const config = {
    development: {
        port: process.env.DEV_PORT || 3000,
        databaseUrl: process.env.DATABASE_URI,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
        CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
        DOMAIN_NAME: process.env.DOMAIN_NAME_DEV,
    },
    production: {
        port: process.env.PROD_PORT,
        databaseUrl: process.env.DATABASE_URI,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
        CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
        DOMAIN_NAME: process.env.DOMAIN_NAME,
    },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
