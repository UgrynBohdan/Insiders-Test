import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { createBook, dropUserBook, getUserBook, getUserBooksById } from "../db/book.repositories";
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
export const deleteBook = async (req: AuthRequest, res: Response) => {
    const { id } = req.params

    if (!req.user) {
        res.status(400).json({ message: "User is undefined" });
        return
    }

    try {
        const rows = await getUserBook(Number(id), req.user.id)

        if ((rows as any[]).length === 0) {
            return res.status(404).json({ message: "Book not found or not yours" })
        }

        await dropUserBook(Number(id), req.user.id)

        res.json({ message: "Book deleted" })
    } catch (err) {
        res.status(500).json({ message: "Error deleting book" });
    }
};
