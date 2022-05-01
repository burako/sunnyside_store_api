import client from "../database";
import { Product } from "../models/product";

export class dashboardQueries {
    
    async findUsersWithOrders() : Promise<{name:string, id:string}[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT DISTINCT users.id, username FROM users INNER JOIN orders ON users.id = orders.user_id';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all users: ${error}`);
        }
    }

    async findPopularProducts () : Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT products.id, products.name, products.price, products.description, products.category, products.created_at, products.updated_at, COUNT(orders_products.product_id) AS count FROM products INNER JOIN orders_products ON products.id = orders_products.product_id GROUP BY products.id ORDER BY count DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all products: ${error}`);
        }
    }
}