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
// enabling each user to edit only their own information by comparing the id from jwt with the one from the request
const update = async (req, res) => {
    const userItem = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password_digest: req.body.password_digest,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.jwtSecret);
        if (decoded.id !== userItem.id) {
            throw new Error('User id does not match!');
        }
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const updated = await user.create(userItem);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
    }
};
const userRoutes = (app) => {
    app.post('/users', create);
    app.post('/users/auth', authenticate);
    app.post('/users/update', update);
};
exports.default = userRoutes;
