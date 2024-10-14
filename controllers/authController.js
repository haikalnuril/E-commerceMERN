import user from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middlewares/asyncHanddler.js';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const isDev = process.env.NODE_ENV === 'development' ? false : true;

    const cookieOptions = {
        expire : new Date
        (Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
        httpOnly: true,
        security: isDev,
    }

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        data: {
            user,
        }
    })
}

export const registerUser = asyncHandler(async (req, res) => {
    const isAdmin = (await user.countDocuments()) === 0

    const role = isAdmin ? 'admin' : 'user';

    const createUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: role
    });

    createSendResToken(createUser, 201, res);
})