import express, {Request, Response} from "express";
import { productStore, Product } from "../models/product";
import verifyAuthToken from "../utilities/verifyAuth";

const store = new productStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const show = async (_req: Request, res: Response) => {
    const product = await store.show(_req.params.id);
    res.json(product);
}

const create = async (_req: Request, res: Response) => {
    try {
        const product: Product = {
            name: _req.body.name,
            price: _req.body.price,
            description: _req.body.description,
            category: _req.body.category,
            created_at: new Date(),
            updated_at: new Date()
        }
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const getProductsByCategory = async (_req: Request, res: Response) => {
    try {
        const products = await store.getProductsByCategory(_req.params.category);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const productRoutes = (app: express.Application) => {
    app.get("/products", index);
    app.post("/product", verifyAuthToken, create);
    app.get("/product/:id", show);
    app.get("/products/:category", getProductsByCategory);
}

export default productRoutes;
