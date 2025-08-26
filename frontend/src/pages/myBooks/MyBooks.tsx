import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "@/pages/myBooks/BooksList";
import AddBookForm from "@/pages/myBooks/AddBookForm";
import { useNavigate } from "react-router-dom";
import type { Book } from "@/pages/books/BooksPage";

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

            const res = await axios.get("http://localhost:3000/api/me/books", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (book: Omit<Book, "id">) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:3000/api/me/books", book, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks((prev) => [...prev, res.data]);
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/api/me/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
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
