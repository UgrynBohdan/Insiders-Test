import { Request, Response } from "express";
import pool from "../db/db";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
    console.log("dsdsds");
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields required" });

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if ((rows as any[]).length > 0) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await hashPassword(password);

    await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashed, "User"]
    );

    res.status(201).json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const users = rows as any[];

    if (users.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = users[0];
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
};
