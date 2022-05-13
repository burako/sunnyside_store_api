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
            conn.release();
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
            conn.release();
            return orderItem;
        } catch (error) {
            throw new Error(`Can not add a new order: ${error}`);
        }
    }

    async addProduct(order_id: string, product_id: string, quantity: number) : Promise<{order_id: number, product_id: number, quantity: number}> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            const orderItem = result.rows[0]
            conn.release();
            return orderItem;
        } catch (error) {
            throw new Error(`Can not add a new product to the order: ${error}`);
        }
    }

    async openOrdersByUser(userId: string) : Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id WHERE orders.user_id=($1) AND orders.order_status=($2)';
            const orders = await conn.query(sql, [userId, "open"]);
            
            conn.release();
            return orders.rows;
        } catch (error) {
            throw new Error(`Can not get all open orders: ${error}`);
        }
    }

    async completedOrdersByUser(userId: string) : Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id WHERE orders.user_id=($1) AND orders.order_status=($2)';
            const orders = await conn.query(sql, [userId, "closed"]);

            conn.release();
            return orders.rows;
        } catch (error) {
            throw new Error(`Can not get all completed orders: ${error}`);
        }
    }
}