import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    category: string;
}

export class productStore {
    async index() : Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all products: ${error}`);
        }
        
    }

    async show(id: string): Promise<Product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
      }

    async create(product: Product) : Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price, description, category, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const result = await conn.query(sql, [product.name, product.price, product.description, product.category, product.created_at, product.updated_at]);
            const productItem = result.rows[0]
            conn.release;
            return productItem;
        } catch (error) {
            throw new Error(`Can not add a new product: ${error}`);
        }
    }

    async destroy(id: string) : Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const productItem = result.rows[0];
            conn.release;
            return productItem;
        } catch (error) {
            throw new Error(`Can not delete product: ${error}`);
        }
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);
            conn.release;
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get all products: ${error}`);
        }
    }
}