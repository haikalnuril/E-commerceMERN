import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

import authRouter from './routes/authRouter.js';

app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// connect DB mongoose
mongoose.connect(process.env.DATABASE, {
    
}).then(() => {
    console.log('Database connected');
})