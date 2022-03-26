"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookStore = void 0;
const database_1 = __importDefault(require("../database"));
class bookStore {
    async getAllBooks() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM books';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch (error) {
            throw new Error(`Can not get all books: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM books WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`);
        }
    }
    async addNewBook(book) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO books (title, total_pages, author, type, summary) VALUES (${book.title}, ${book.total_pages}, ${book.author}, ${book.type}, ${book.summary})`;
            const result = await conn.query(sql);
            conn.release;
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Can not add a new book: ${error}`);
        }
    }
}
exports.bookStore = bookStore;
