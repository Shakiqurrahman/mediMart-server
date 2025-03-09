import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes/routes';

export const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// middlewares
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());

// routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api/v1', router);

// Not Found Handler [should be after all routes]
app.use(notFound);

// Global Error Handler [Always should be not found handlers]
app.use(globalErrorHandler);
