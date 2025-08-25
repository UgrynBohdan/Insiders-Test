import pool from "./db"
import { QueryResult, ResultSetHeader } from "mysql2"


export async function selectAllUsers(): Promise<QueryResult> {
    const [rows] = await pool.execute('SELECT * FROM users')
    return rows
}

export async function createUser(name: string, email: string, password: string): Promise<ResultSetHeader> {
    const [rows] = await pool.execute<ResultSetHeader>(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password]
    )
    return rows

}

export async function selectUser(email: string): Promise<QueryResult> {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows
}

export async function deleteUser(id: number): Promise<void> {
    const [rows] = await pool.execute(`DELETE FROM users WHERE id = ?`, [id])
    // console.log(rows)
}