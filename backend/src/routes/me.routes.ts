import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    try {
        const token = req.cookies?.token; // беремо JWT з куки
        if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        // можна тут витягти користувача з БД якщо треба
        res.json({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
        });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

export default router;
