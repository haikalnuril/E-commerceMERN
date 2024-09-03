import express from 'express';

const app = express();
const port = 3000;

import authRouter from './routes/authRouter.js';

app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});