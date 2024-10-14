import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import authRouter from './routes/authRouter.js';

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`EcommerceMERN app listening at http://localhost:${port}`);
});

// connect DB mongoose
mongoose.connect(process.env.DATABASE, {
    
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database connection failed', err);
});