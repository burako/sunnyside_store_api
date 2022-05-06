"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch (error) {
            throw new Error(`Can not get all products: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price, description, category, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const result = await conn.query(sql, [product.name, product.price, product.description, product.category, product.created_at, product.updated_at]);
            const productItem = result.rows[0];
            conn.release;
            return productItem;
        }
        catch (error) {
            throw new Error(`Can not add a new product: ${error}`);
        }
    }
    async getProductsByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);
            conn.release;
            return result.rows;
        }
        catch (error) {
            throw new Error(`Can not get all products: ${error}`);
        }
    }
}
exports.productStore = productStore;
