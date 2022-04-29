import express, {Request, Response} from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        const decoded = jwt.verify(token, <Secret> process.env.jwtSecret)

        next()
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken