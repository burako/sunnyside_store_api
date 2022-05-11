"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuth_1 = __importDefault(require("../utilities/verifyAuth"));
const store = new product_1.productStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        res.json(error);
        res.status(400);
    }
};
const show = async (_req, res) => {
    try {
        const product = await store.show(_req.params.id);
        res.json(product);
    }
    catch (error) {
        res.json(error);
        res.status(400);
    }
};
const create = async (_req, res) => {
    try {
        const product = {
            name: _req.body.name,
            price: _req.body.price,
            description: _req.body.description,
            category: _req.body.category,
            created_at: new Date(),
            updated_at: new Date()
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const getProductsByCategory = async (_req, res) => {
    try {
        const products = await store.getProductsByCategory(_req.params.category);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get("/products", index);
    app.post("/products", verifyAuth_1.default, create);
    app.get("/products/:id", show);
    app.get("/products/category/:category", getProductsByCategory);
};
exports.default = productRoutes;
