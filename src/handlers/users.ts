import {userClass, User } from "../models/user";
import express, {Request, Response} from "express";
import jwt, { Secret } from "jsonwebtoken";
import verifyAuthToken from "../utilities/verifyAuth";

const user = new userClass();

const create = async (req: Request, res: Response) => {
    try {
        const userItem : User = {
            username: req.body.username,
            password_digest: req.body.password_digest
        }
        const newUser = await user.create(userItem);
        const token = jwt.sign({user: newUser}, <Secret> process.env.jwtSecret);
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

const authenticate = async (req: Request, res: Response) => {
    try {
        const userItem : User = {
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

// enabling each user to edit only their own information by comparing the id from jwt with the one from the request
const update = async (req: Request, res: Response) => {
    const userItem: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password_digest: req.body.password_digest,
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        const decoded: { id: number, username: string, password: string } = jwt.verify(token, <Secret> process.env.jwtSecret) as { id: number, username: string, password: string }
        if(decoded.id !== userItem.id) {
            throw new Error('User id does not match!');
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await user.create(userItem)
        res.json(updated)
    } catch(err) {
        res.status(400)
    }
}

const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users',verifyAuthToken, index);
    app.post('/users/auth', authenticate);
    app.post('/users/update', update);
}

export default userRoutes;