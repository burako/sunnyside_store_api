import {userClass, User } from "../models/user";
import express, {Request, Response} from "express";
import jwt, { Secret } from "jsonwebtoken";
import verifyAuthToken from "../utilities/verifyAuth";

const user = new userClass();

const create = async (req: Request, res: Response) => {
    try {
        const userItem : User = {
            username: req.body.username,
            password_digest: req.body.password_digest,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
        }
        const newUser = await user.create(userItem);
        const token = await jwt.sign({user: newUser}, <Secret> process.env.jwtSecret);
        res.json(token);
    } catch (error) {
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const users = await user.index();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const userItem = await user.show(req.params.id);
        res.json(userItem);
    } catch (error) {
        res.json(error);
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const userItem = {
            username: req.body.username,
            password_digest: req.body.password_digest
        }
        const authUser = await user.authenticate(userItem.username, userItem.password_digest);
        const token = jwt.sign({user: authUser}, <Secret> process.env.jwtSecret);
        res.json(token);
    }
    catch (error) {
        res.json(error);
    }
}

const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users',verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users/auth', authenticate);
}

export default userRoutes;