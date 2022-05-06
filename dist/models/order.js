"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch (error) {
            throw new Error(`Can not get all orders: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async create(order) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id, order_status, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [order.user_id, order.order_status, order.created_at, order.updated_at]);
            const orderItem = result.rows[0];
            conn.release;
            return orderItem;
        }
        catch (error) {
            throw new Error(`Can not add a new order: ${error}`);
        }
    }
    async addProduct(order_id, product_id, quantity) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            const orderItem = result.rows[0];
            conn.release;
            return orderItem;
        }
        catch (error) {
            throw new Error(`Can not add a new product to the order: ${error}`);
        }
    }
    async openOrdersByUser(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id WHERE orders.user_id=($1) AND orders.order_status=($2)';
            const orders = await conn.query(sql, [userId, "open"]);
            conn.release;
            return orders.rows;
        }
        catch (error) {
            throw new Error(`Can not get all open orders: ${error}`);
        }
    }
    async completedOrdersByUser(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id WHERE orders.user_id=($1) AND orders.order_status=($2)';
            const orders = await conn.query(sql, [userId, "closed"]);
            conn.release;
            return orders.rows;
        }
        catch (error) {
            throw new Error(`Can not get all completed orders: ${error}`);
        }
    }
}
exports.orderStore = orderStore;
