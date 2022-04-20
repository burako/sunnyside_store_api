import {userClass, User } from "../models/user";
import express, {Request, Response} from "express";

const user = new userClass();

const create = async (req: Request, res: Response) => {
    try {
        const userItem : User = {
            username: req.body.username,
            password_digest: req.body.password_digest
        }
        const newUser = await user.create(userItem);
        res.json(newUser);
    } catch (error) {
        res.json(error);
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const userItem : User = {
            username: req.body.username,
            password_digest: req.body.password_digest
        }
        const authUser = await user.authenticate(userItem.username, userItem.password_digest);
        res.json(authUser);
    }
    catch (error) {
        res.json(error);
    }
}


const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.post('/users/auth', authenticate);
}

export default userRoutes;