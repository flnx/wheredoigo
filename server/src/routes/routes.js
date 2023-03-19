const authRoutes = require("./authRoutes");
const destinationRoutes = require('./destinationRoutes');

module.exports = (app) => {
    app.use(authRoutes);
    app.use(destinationRoutes);
}