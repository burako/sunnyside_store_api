import express, { Request, Response } from 'express';
import { dashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
    app.get('/users/orders', usersWithOrders);
}

const dashboard = new dashboardQueries();

const usersWithOrders = async (_req: Request, res: Response) => {
    const users = await dashboard.findUsersWithOrders();
    res.json(users);
}

export default dashboardRoutes;