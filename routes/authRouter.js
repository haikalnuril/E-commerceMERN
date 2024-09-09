import express from 'express';
import asyncHandler from '../middlewares/asyncHanddler.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/register', asyncHandler(async(req, res) => {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
}));

router.post('/login', (req, res) => {
    res.send('Login');
});

router.get('/logout', (req, res) => {
    res.send('Logout');
});

router.get('/getuser', (req, res) => {
    res.send('Get User');
});

export default router;