"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.productStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (_req, res) => {
    const product = await store.show(_req.body.id);
    res.json(product);
};
const create = async (_req, res) => {
    try {
        const product = {
            name: _req.body.name,
            price: _req.body.price,
            description: _req.body.description,
            created_at: new Date(),
            updated_at: new Date()
        };
        const newProduct = await store.create(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get("/", index);
    app.post("/", create);
    app.get("/:id", show);
};
exports.default = productRoutes;
