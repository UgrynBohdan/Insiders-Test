import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import path from 'path';
import fs from 'fs';

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../keys/public.pem'), 'utf8')

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' })

    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, PUBLIC_KEY);
        (req as any).user = user;
        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
    }
}

export default authMiddleware