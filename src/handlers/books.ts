import express, { NextFunction, Request, Response } from 'express'
import { Book, bookStore } from '../models/book'
import jwt, { Secret } from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader!.split(' ')[1];
        const decoded = jwt.verify(token, <Secret> process.env.jwtSecret);

        next()
    } catch (error) {
        res.status(401)
    }
}

const store = new bookStore()

const index = async (_req: Request, res: Response) => {
  const books = await store.index()
  res.json(books)
}

const show = async (_req: Request, res: Response) => {
   const book = await store.show(_req.params.id)
   res.json(book)
}

const create = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = _req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, <Secret> process.env.jwtSecret)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    
    try {
        const book: Book = {
            title: _req.body.title,
            author: _req.body.author,
            total_pages: _req.body.total_pages,
            summary: _req.body.summary,
            type: ''
        }

        const newBook = await store.create(book)
        res.json(newBook)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(_req.body.id)
    res.json(deleted)
}

const articleRoutes = (app: express.Application) => {
  app.get('/books', index)
  app.get('/books/:id', show)
  app.post('/books', verifyAuthToken, create)
  app.delete('/books', verifyAuthToken, destroy)
}

export default articleRoutes