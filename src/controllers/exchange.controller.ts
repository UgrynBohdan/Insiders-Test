import { Request, Response } from "express";
import pool from "../db/db";
import nodemailer from "nodemailer";

// створюємо транспортер
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // або твій SMTP
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const requestExchange = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const userId = (req as any).user.id; // беремо з JWT middleware

    try {
        // 1. знайти книгу
        const [bookRows]: any = await pool.query(
        "SELECT b.*, u.name as owner_name, u.email as owner_email, u.id as owner_id FROM books b JOIN users u ON b.user_id = u.id WHERE b.id = ?",
        [bookId]
        );
        if (bookRows.length === 0) {
        return res.status(404).json({ message: "Book not found" });
        }

        const book = bookRows[0];

        // 2. заборонити відправку на свою книгу
        if (book.owner_id === userId) {
        return res.status(400).json({ message: "You cannot request exchange for your own book" });
        }

        // 3. отримати дані відправника
        const [senderRows]: any = await pool.query(
        "SELECT id, name, email FROM users WHERE id = ?",
        [userId]
        );
        const sender = senderRows[0];

        // 4. отримати всі книги відправника
        const [senderBooks]: any = await pool.query(
        "SELECT id, name, author FROM books WHERE user_id = ?",
        [userId]
        );

        // 5. сформувати лист
        const mailOptions = {
        from: process.env.SMTP_USER,
        to: book.owner_email,
        subject: `Запит на обмін книгою "${book.name}"`,
        html: `
            <p>Вітаю, ${book.owner_name}!</p>
            <p>Користувач <b>${sender.name}</b> (${sender.email}) хоче обмінятись з вами книгою <b>"${book.name}"</b>.</p>
            <p>Його книги для обміну:</p>
            <ul>
            ${senderBooks.map((b: any) => `<li>${b.name} — ${b.author}</li>`).join("")}
            </ul>
        `,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Exchange request sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error sending exchange request" });
    }
};
