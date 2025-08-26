import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MyBooks from "./pages/myBooks/MyBooks";

export default function AppRoutes() {
    return (
        <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/me/books" element={<MyBooks />} />
              </Routes>
        </BrowserRouter>
    );
}
