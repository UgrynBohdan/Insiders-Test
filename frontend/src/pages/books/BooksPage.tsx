import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export interface Book {
    id: number;
    name: string;
    author: string;
    photo: string;
    owner_name: string;
}

function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBooks = async () => {
        try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/books", {
            params: {
                search,
                sort,
                page,
            },
        });        

        setBooks(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        } catch (err) {
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [search, sort, page]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Books</h1>

            {/* Пошук + сортування */}
            <div className="flex gap-4 mb-4">
                <input
                type="text"
                placeholder="Search by name or author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-2 flex-1"
                />
                <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "asc" | "desc")}
                className="border rounded px-3 py-2"
                >
                <option value="asc">Sort A → Z</option>
                <option value="desc">Sort Z → A</option>
                </select>
            </div>

            {/* Список книг */}
            {loading ? (
                <p>Loading...</p>
            ) : books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <ul className="grid grid-cols-2 gap-4">
                {books.map((book) => (
                    <li key={book.id} className="border p-4 rounded shadow">
                    <img
                        src={book.photo}
                        alt={book.name}
                        className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h2 className="font-bold">{book.name}</h2>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <Link
                        to={`/books/${book.id}`}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        View Details
                    </Link>
                    </li>
                ))}
                </ul>
            )}

            {/* Пагінація */}
            <div className="flex justify-center gap-2 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    {page} / {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default BooksPage;
