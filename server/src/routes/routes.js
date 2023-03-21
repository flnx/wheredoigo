const authRoutes = require("./authRoutes");
const destinationRoutes = require('./destinationRoutes');
const placeRoutes = require('./placeRoutes');

module.exports = (app) => {
    app.use(authRoutes);
    app.use(destinationRoutes);
    app.use(placeRoutes);
}