import { Router } from 'express'

import { register, login } from "../controllers/auth.controller";

const router = Router()

router.post("/register", register);
router.post("/login", login);

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({ message: "Logged out" });
});


export default router