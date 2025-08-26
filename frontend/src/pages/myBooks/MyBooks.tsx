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
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/register', { replace: true })
                return
            }

            const res = await getMyBooks(token)
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (book: Omit<Book, "id">) => {
        try {
            const token = localStorage.getItem("token") as string;
            const res = await postMyNewBook(token, book)
            setBooks((prev) => [...prev, res.data]);
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            const token = localStorage.getItem("token") as string;
            await deleteMyBook(token, id)
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
