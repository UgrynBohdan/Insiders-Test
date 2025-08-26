import { useState } from "react";
import type { Book } from "@/pages/books/BooksPage";

interface Props {
    onAdd: (book: Omit<Book, "id">) => void;
}

function AddBookForm({ onAdd }: Props) {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [photo, setPhoto] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !author) return;
        onAdd({ name, author, photo });
        setName("");
        setAuthor("");
        setPhoto("");
    };

  return (
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
          <input
              className="border rounded p-2"
              placeholder="Book name"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <input
              className="border rounded p-2"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
          />
          <input
              className="border rounded p-2"
              placeholder="Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
          />
          <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
              Add Book
          </button>
      </form>
    );
}

export default AddBookForm;
