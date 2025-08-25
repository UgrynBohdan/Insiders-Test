import { Request, Response } from "express";
import pool from "../db/db";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        // Інформація про користувача
        const [users] = await pool.query("SELECT id, name, email, avatar FROM users WHERE id = ?", [userId]);
        const user = (users as any)[0];

        if (!user) return res.status(404).json({ message: "User not found" });

        // Кількість книг
        const [booksCount] = await pool.query("SELECT COUNT(*) as total FROM books WHERE user_id = ?", [userId]);
        const totalBooks = (booksCount as any)[0].total;

        // Запити на обмін
        const [requests] = await pool.query(
            `SELECT r.id, r.message, r.created_at, u.name as sender_name, u.email as sender_email
             FROM exchange_requests r
             JOIN users u ON r.from_user_id = u.id
             WHERE r.to_user_id = ?`,
            [userId]
        );

        res.json({
            ...user,
            totalBooks,
            exchangeRequests: requests
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching profile" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { name, email, avatar } = req.body;

        await pool.query(
            "UPDATE users SET name = ?, email = ?, avatar = ? WHERE id = ?",
            [name, email, avatar, userId]
        );

        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating profile" });
    }
};
