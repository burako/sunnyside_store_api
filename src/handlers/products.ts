import express, {Request, Response} from "express";
import { productStore, Product } from "../models/product";

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

const productRoutes = (app: express.Application) => {
    app.get("/products", index);
    app.post("/product", create);
    app.get("/product/:id", show);
}

export default productRoutes;
