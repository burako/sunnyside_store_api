"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = new user_1.userClass();
const create = async (req, res) => {
    try {
        const userItem = {
            username: req.body.username,
            password_digest: req.body.password_digest
        };
        const newUser = await user.create(userItem);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.jwtSecret);
        res.json(token);
    }
    catch (error) {
        res.json(error);
    }
};
const authenticate = async (req, res) => {
    try {
        const userItem = {
            username: req.body.username,
            password_digest: req.body.password_digest
        };
        const authUser = await user.authenticate(userItem.username, userItem.password_digest);
        const token = jsonwebtoken_1.default.sign({ user: authUser }, process.env.jwtSecret);
        res.json(token);
    }
    catch (error) {
        res.json(error);
    }
};
const userRoutes = (app) => {
    app.post('/users', create);
    app.post('/users/auth', authenticate);
};
exports.default = userRoutes;
