import { Request, Response } from "express";
import pool from "../db/db";

// GET all users
export const getUsers = async (req: Request, res: Response) => {
    const [rows] = await pool.query("SELECT id, name, email, role FROM users");
    res.json(rows);
};

// GET user by id
export const getUser = async (req: Request, res: Response) => {
    const [rows]: any = await pool.query("SELECT id, name, email, role FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
};

// UPDATE user (role, name, email)
export const updateUser = async (req: Request, res: Response) => {
    const { name, email, role } = req.body;
    await pool.query("UPDATE users SET name=?, email=?, role=? WHERE id=?", [
        name,
        email,
        role,
        req.params.id,
    ]);
    res.json({ message: "User updated" });
};

// DELETE user
export const deleteUser = async (req: Request, res: Response) => {
    await pool.query("DELETE FROM users WHERE id=?", [req.params.id]);
    res.json({ message: "User deleted" });
};
