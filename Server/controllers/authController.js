import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();
import { Oauth2Client } from "google-auth-library";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const isDev = process.env.NODE_ENV === "development" ? false : true;

    const cookieOptions = {
        expire: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
        ),
        httpOnly: true,
        security: isDev,
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        data: {
            user,
        },
    });
};

export const registerUser = asyncHandler(async (req, res) => {
    const isAdmin = (await user.countDocuments()) === 0;

    const role = isAdmin ? "admin" : "user";

    const createUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: role,
    });

    createSendResToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }

    const userData = await user.findOne({
        email: req.body.email,
    });

    if (userData && (await userData.matchPassword(req.body.password))) {
        createSendResToken(userData, 200, res);
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    const userData = await user.findById(req.user.id).select("-password");

    if (userData) {
        res.status(200).json({
            status: "success",
            data: {
                user: userData,
            },
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    res.status(200).json({
        status: "success",
        message: "User logged out",
    });
};

export const googleOauth = asyncHandler(async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    const redirectUrl = "http://127.0.0.1:3000/oauth";
    const client = new Oauth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/userinfo.profile openid"],
        prompt: "consent",
    });

    res.json({ url: authorizeUrl });
});

const getUserDataFromOauth = async (access_token) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`
    );
    const data = await response.json();
    console.log("data", data);
};

export const googleOauthCallback = asyncHandler(async (req, res) => {
    try {
        const redirectUrl = "http://127.0.0.1:3000/oauth";
        const Oauth2Client = new Oauth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await Oauth2Client.getToken(req.query.code);
        await Oauth2Client.setCredentials(res.tokens);
        const user = Oauth2Client.credentials;
        console.log("user", user);
        await getUserDataFromOauth(user.access_token);
    } catch (error) {
        console.log(error.message);
    }
});
