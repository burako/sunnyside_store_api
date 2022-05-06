"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuth_1 = __importDefault(require("../utilities/verifyAuth"));
const store = new order_1.orderStore();
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (_req, res) => {
    const order = await store.show(_req.body.id);
    res.json(order);
};
const create = async (_req, res) => {
    try {
        const order = {
            user_id: _req.body.user_id,
            order_status: _req.body.order_status,
            created_at: new Date(),
            updated_at: new Date()
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.product_id;
    const quantity = parseInt(_req.body.quantity);
    const orderStatus = await store.show(orderId);
    if (orderStatus.order_status != "closed") {
        try {
            const order = await store.addProduct(orderId, productId, quantity);
            res.json(order);
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    }
    else {
        res.status(400);
        res.json({
            error: "Order is closed"
        });
    }
};
const openOrdersByUser = async (_req, res) => {
    const userId = _req.params.id;
    try {
        const orders = await store.openOrdersByUser(userId);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const completedOrdersByUser = async (_req, res) => {
    const userId = _req.params.id;
    try {
        const orders = await store.completedOrdersByUser(userId);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get("/orders", verifyAuth_1.default, index);
    app.post("/orders", verifyAuth_1.default, create);
    app.get("/orders/:id", verifyAuth_1.default, show);
    app.post("/orders/:id/addproduct", verifyAuth_1.default, addProduct);
    app.get("/orders/user/:id/open", verifyAuth_1.default, openOrdersByUser);
    app.get("/orders/user/:id/completed", verifyAuth_1.default, completedOrdersByUser);
};
exports.default = orderRoutes;
