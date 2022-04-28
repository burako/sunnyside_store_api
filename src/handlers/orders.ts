import { Order, orderStore } from "../models/order";
import express, {Request, Response} from "express";

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
}

const show = async (_req: Request, res: Response) => {
  const order = await store.show(_req.body.id);
  res.json(order);
}

const create = async (_req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: _req.body.user_id,
      order_status: _req.body.order_status,
      created_at: new Date(),
      updated_at: new Date()
    }
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.product_id;
  const quantity: number = parseInt(_req.body.quantity);
  const orderStatus = await store.show(orderId);

  if (orderStatus.order_status != "closed") {
    try {
        const order = await store.addProduct(orderId, productId, quantity);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
  } else {
    res.status(400);
    res.json({
        error: "Order is closed"
    });
  }
}

const orderRoutes = (app: express.Application) => {
    app.get("/orders", index);
    app.post("/order", create);
    app.get("/order/:id", show);
    app.post("/order/:id/product", addProduct);
}

export  default orderRoutes;