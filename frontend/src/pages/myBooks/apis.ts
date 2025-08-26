import api from "@/lib/api";
import type { Book } from "../books/BooksPage";

export async function getMyBooks() {
    return await api.get("/me/books", { withCredentials: true });
}

export async function postMyNewBook(book: Omit<Book, "id">) {
    return api.post("/me/books", book, { withCredentials: true });
}

export async function deleteMyBook(id: number) {
    return api.delete(`/me/books/${id}`, { withCredentials: true });
}
