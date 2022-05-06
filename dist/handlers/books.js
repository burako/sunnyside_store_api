"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../models/book");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.jwtSecret);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const store = new book_1.bookStore();
const index = async (_req, res) => {
    const books = await store.index();
    res.json(books);
};
const show = async (_req, res) => {
    const book = await store.show(_req.params.id);
    res.json(book);
};
const create = async (_req, res) => {
    try {
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.jwtSecret);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const book = {
            title: _req.body.title,
            author: _req.body.author,
            total_pages: _req.body.total_pages,
            summary: _req.body.summary,
            type: ''
        };
        const newBook = await store.create(book);
        res.json(newBook);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (_req, res) => {
    const deleted = await store.delete(_req.body.id);
    res.json(deleted);
};
const articleRoutes = (app) => {
    app.get('/books', index);
    app.get('/books/:id', show);
    app.post('/books', verifyAuthToken, create);
    app.delete('/books', verifyAuthToken, destroy);
};
exports.default = articleRoutes;
