import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { getUserByEmail, registerUser } from "../db/auth.repositories";
import { ІUser } from "../interfaces"

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields required" });

    const rows = await getUserByEmail(email)
    if ((rows as any[]).length > 0) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await hashPassword(password);

    await registerUser(name, email, hashed)

    res.status(201).json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ message: "All fields required" });

    const [rows] = await getUserByEmail(email)
    const user = rows as ІUser

    if (!user) return res.status(400).json({ message: "Invalid credentials" });
        
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
};
