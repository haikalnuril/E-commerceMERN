import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", (req, res) => {
    res.send("Login");
});

router.get("/logout", (req, res) => {
    res.send("Logout");
});

router.get("/getuser", (req, res) => {
    res.send("Get User");
});

export default router;
