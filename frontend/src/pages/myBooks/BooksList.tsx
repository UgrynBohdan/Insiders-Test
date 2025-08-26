import type { Book } from "@/pages/books/BooksPage";
import BookItem from "./BookItem";

interface Props {
  books: Book[];
  onDelete: (id: number) => void;
}

function BookList({ books, onDelete }: Props) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BookList;
