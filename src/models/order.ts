import client from "../database";

export type Order = {
    id?: number;
    user_id: number;
    order_status: string;
    created_at: Date;
    updated_at: Date;
}

export class orderStore {
    async index() : Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all orders: ${error}`);
        }
        
    }

    async show(id: string): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
      }

    async create(order: Order) : Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id, order_status, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [order.user_id, order.order_status, order.created_at, order.updated_at]);
            const orderItem = result.rows[0]
            conn.release;
            return orderItem;
        } catch (error) {
            throw new Error(`Can not add a new order: ${error}`);
        }
    }

    async addProduct(orderId: string, productId: string, quantity: number) : Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [orderId, productId, quantity]);
            const orderItem = result.rows[0]
            conn.release;
            return orderItem;
        } catch (error) {
            throw new Error(`Can not add a new product to the order: ${error}`);
        }
    }
}