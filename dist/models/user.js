"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userClass = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { bycript_password, salt_rounds } = process.env;
const pepper = bycript_password;
const saltRounds = salt_rounds;
class userClass {
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (username, password_digest, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password_digest + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [user.username, hash, user.first_name, user.last_name]);
            const userItem = result.rows[0];
            conn.release;
            return userItem;
        }
        catch (error) {
            throw new Error(`Can not create a new user: ${error}`);
        }
    }
    async destroy(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            const userItem = result.rows[0];
            conn.release;
            return userItem;
        }
        catch (error) {
            throw new Error(`Can not delete user: ${error}`);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch (error) {
            throw new Error(`Can not get all users: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async authenticate(username, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                    conn.release;
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error(`Could not find user ${username}. Error: ${err}`);
        }
    }
}
exports.userClass = userClass;
