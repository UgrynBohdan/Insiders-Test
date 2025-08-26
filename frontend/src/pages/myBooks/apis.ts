import api from "@/lib/api";
import type { Book } from "../books/BooksPage";

export async function getMyBooks(token: string) {
    return await api.get("/me/books", {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function postMyNewBook(token: string, book: Omit<Book, "id">) {
    return api.post("/me/books", book, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function deleteMyBook(token: string, id: number) {
    const url = `/me/books/${id}`
    return api.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
}