"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class dashboardQueries {
    async findUsersWithOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT DISTINCT users.id, username FROM users INNER JOIN orders ON users.id = orders.user_id';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch (error) {
            throw new Error(`Can not get all users: ${error}`);
        }
    }
    async findPopularProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT products.id, products.name, products.price, products.description, products.category, COUNT(orders_products.product_id) AS count FROM products INNER JOIN orders_products ON products.id = orders_products.product_id GROUP BY products.id ORDER BY count DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch (error) {
            throw new Error(`Can not get all products: ${error}`);
        }
    }
}
exports.dashboardQueries = dashboardQueries;
