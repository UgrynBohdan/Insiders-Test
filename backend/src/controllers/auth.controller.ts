import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { getUserByEmail, registerUser } from "../db/auth.repositories";

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
    const user = { id: rows.id, name: rows.name, email: rows.email, role: rows.role }

    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    const match = await comparePassword(password, rows.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
        token,
        user,
    });
};
