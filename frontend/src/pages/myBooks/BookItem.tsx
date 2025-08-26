import type { Book } from "@/pages/books/BooksPage";
import { Link } from "react-router-dom";

interface Props {
    book: Book;
    onDelete: (id: number) => void;
}

function BookItem({ book, onDelete }: Props) {
    return (
        <div className="flex items-center justify-between border rounded p-3 shadow-sm">
            <div className="flex items-center gap-4">
                {book.photo && (
                    <img
                      src={book.photo}
                      alt={book.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                )}
                <div>
                    <h3 className="font-bold">{book.name}</h3>
                    <p className="text-gray-600">{book.author}</p>
                </div>
            </div>
            <Link
                to={`/books/${book.id}`}
                className="text-blue-600 hover:underline text-sm"
            >
                View Details
            </Link>
            <button
                onClick={() => onDelete(book.id)}
                className="text-red-600 hover:text-red-800"
            >
                Delete
            </button>
        </div>
    );
}

export default BookItem;
