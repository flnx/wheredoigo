const authRoutes = require("./authRoutes");

module.exports = (app) => {
    app.use(authRoutes);
}