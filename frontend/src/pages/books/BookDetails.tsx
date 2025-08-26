import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Book } from "./BooksPage";

function BookDetails() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const fetchBook = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:3000/api/books/${id}`,
                { withCredentials: true }
            );
            setBook(res.data);
        } catch (err) {
            console.error("Error fetching book:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [id]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (!book) return <p className="p-6">Book not found</p>;

    const requestExchange = async () => {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/books/${id}/request-exchange`,
                {},
                { withCredentials: true }
            );

            alert(res.data.message);
        } catch (err: any) {
            alert(err.response?.data?.message || "Something went wrong");
            console.error(err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <button
                onClick={handleGoBack}
                className="text-blue-600 hover:underline mb-4 block"
            >
                ← Back to list
            </button>

            <img
                src={book.photo}
                alt={book.name}
                className="w-full h-64 object-cover rounded mb-4"
            />
            <h1 className="text-3xl font-bold">{book.name}</h1>
            <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
            <p className="text-lg text-gray-600 mb-4">Owner is {book.owner_name}</p>

            <button
                onClick={requestExchange}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                ask for an exchange
            </button>
        </div>
    );
}

export default BookDetails;
