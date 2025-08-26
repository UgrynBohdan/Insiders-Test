import { useEffect, useState } from "react";
import BookList from "@/pages/myBooks/BooksList";
import AddBookForm from "@/pages/myBooks/AddBookForm";
import { useNavigate } from "react-router-dom";
import type { Book } from "@/pages/books/BooksPage";
import { deleteMyBook, getMyBooks, postMyNewBook } from "./apis";

function MyBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            const res = await getMyBooks();
            setBooks(res.data);
        } catch (err: any) {
            if (err.response?.status === 401) {
                navigate("/register", { replace: true });
            }
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (book: Omit<Book, "id">) => {
        try {
            const res = await postMyNewBook(book);
            setBooks((prev) => [...prev, res.data]);
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            await deleteMyBook(id);
            setBooks((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error("Error deleting book:", err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Books</h1>
            <AddBookForm onAdd={addBook} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <BookList books={books} onDelete={deleteBook} />
            )}
        </div>
    );
}

export default MyBooks;
