import { Request, Response } from "express";
import pool from "../db/db";

// GET /books/:id
export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const [rows] = await pool.query(
          "SELECT b.*, u.name as owner_name, u.email as owner_email FROM books b JOIN users u ON b.user_id = u.id WHERE b.id = ?",
          [id]
      );

      const books = rows as any[];

      if (books.length === 0) {
          return res.status(404).json({ message: "Book not found" });
      }

      res.json(books[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching book" });
    }
};


// GET /books?search=...&sort=asc&page=1&limit=10
// приклад: http://localhost:3000/api/books?search=clean&sort=asc&page=2&limit=5
export const getBooks = async (req: Request, res: Response) => {
    const { search, sort = "asc", page = "1", limit = "10" } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const offset = (pageNum - 1) * limitNum;

    let whereClause = "";
    let params: any[] = [];

    if (search) {
        whereClause = "WHERE b.name LIKE ? OR b.author LIKE ?";
        params.push(`%${search}%`, `%${search}%`);
    }

    // основний SELECT
    const query = `
        SELECT b.*, u.name as owner_name, u.email as owner_email
        FROM books b
        LEFT JOIN users u ON b.user_id = u.id
        ${whereClause}
        ORDER BY b.name ${sort === "desc" ? "DESC" : "ASC"}
        LIMIT ? OFFSET ?
    `;
    params.push(limitNum, offset);

    try {
        const [rows] = await pool.query(query, params);

        // окремо рахуємо total
        const [countRows] = await pool.query(
            `SELECT COUNT(*) as total FROM books b ${whereClause}`,
            search ? [`%${search}%`, `%${search}%`] : []
        );
        const total = (countRows as any)[0].total;

        res.json({
            data: rows,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching books" });
    }
};
