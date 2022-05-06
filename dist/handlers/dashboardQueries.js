"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const dashboardRoutes = (app) => {
    app.get('/users/orders', usersWithOrders);
    app.get('/products/popular', findPopularProducts);
};
const dashboard = new dashboard_1.dashboardQueries();
const usersWithOrders = async (_req, res) => {
    const users = await dashboard.findUsersWithOrders();
    res.json(users);
};
const findPopularProducts = async (_req, res) => {
    const products = await dashboard.findPopularProducts();
    res.json(products);
};
exports.default = dashboardRoutes;
