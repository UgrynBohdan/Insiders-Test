import pool from "./db"
import { QueryResult, ResultSetHeader } from "mysql2"


export async function registerUser(name: string, email: string, hashed: string): Promise<ResultSetHeader> {
    const [rows] = await pool.execute<ResultSetHeader>(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashed, "User"]
    )
    return rows
}

export async function getUserByEmail(email: string): Promise<any> {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    return rows
}
