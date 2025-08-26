import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MyBooks from "./pages/myBooks/MyBooks";
import BooksPage from "./pages/books/BooksPage";
import BookDetails from "./pages/books/BookDetails";
import AdminPage from "./pages/admin/AdminPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me/books" element={<MyBooks />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
}
