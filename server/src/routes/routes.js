const userRoutes = require('./userRoutes');
const destinationRoutes = require('./destinationRoutes');
const placeRoutes = require('./placeRoutes');

module.exports = (app) => {
    app.use(userRoutes);
    app.use(destinationRoutes);
    app.use(placeRoutes);
};