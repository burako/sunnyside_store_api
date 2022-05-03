import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import articleRoutes from './handlers/books';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboardQueries';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

userRoutes(app);
articleRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export  default app;
