import pool from "./db"
import { QueryResult, ResultSetHeader } from "mysql2"

export async function getUserBooksById(userId: number): Promise<any> {
    const [rows] = await pool.execute("SELECT * FROM books WHERE user_id = ?", [userId])
    return rows
}

export async function createBook(userId: number, bookName: string, author: string, photoUrl: string | undefined) {
    const [rows] = await pool.execute(
        "INSERT INTO books (user_id, name, author, photo) VALUES (?, ?, ?, ?)",
        [userId, bookName, author, photoUrl || null]
    );
    return rows
}

export async function getUserBook(bookId: number) { 
    const [rows] = await pool.execute("SELECT user_id FROM books WHERE id=?", [bookId]);
    return rows
}

export async function dropUserBook(bookId: number) {
    const [rows] = await pool.execute("DELETE FROM books WHERE id=?", [bookId]);
    return rows
}