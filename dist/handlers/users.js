"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const user = new user_1.userClass();
const create = async (req, res) => {
    try {
        const userItem = {
            username: req.body.username,
            password_digest: req.body.password_digest
        };
        const newUser = await user.create(userItem);
        res.json(newUser);
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
        res.json(authUser);
    }
    catch (error) {
        res.json(error);
    }
};
const userRoutes = (app) => {
    app.post('/users', create);
    app.get('/users/auth', authenticate);
};
exports.default = userRoutes;
