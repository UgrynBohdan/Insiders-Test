import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces";

export interface AuthRequest extends Request {
    user?: IUser;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token; // беремо з куки
    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as IUser;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware