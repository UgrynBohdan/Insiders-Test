import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { createBook, dropUserBook, getUserBook, getUserBooksById } from "../db/userBooks.repositories";
// import { AuthRequest } from "../middlewares/auth";

// Перегляд своїх книг
export const getMyBooks = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(400).json({ message: "User is undefined" });
            return
        }

        const books = await getUserBooksById(req.user.id)
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books" });
    }
};

// Додавання книги
export const addBook = async (req: AuthRequest, res: Response) => {
    const { name, author, photo } = req.body;

    if (!name || !author) {
        return res.status(400).json({ message: "Name and author required" });
    }

    if (!req.user) {
        res.status(400).json({ message: "User is undefined" });
        return
    }

    try {
        const result = await createBook(req.user.id, name, author, photo || null)

        res.status(201).json({
            id: (result as any).insertId,
            name,
            author,
            photo,
        });
    } catch (err) {
        res.status(500).json({ message: "Error adding book" });
    }
};

// Видалення книги
export const deleteBook = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    const user = (req as any).user;

    try {
        // Якщо Admin — може видалити будь-яку
        if (user.role === "Admin") {
            await dropUserBook(bookId)
            return res.json({ message: "Book deleted by Admin" });
        }

        // Якщо User — тільки свою
        const [rows]: any = await getUserBook(bookId)
        if (rows.length === 0) return res.status(404).json({ message: "Book not found" });

        if (rows[0].user_id !== user.id) {
            return res.status(403).json({ message: "You can delete only your own books" });
        }

        await getUserBook(bookId)
        res.json({ message: "Book deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting book" });
    }
};

