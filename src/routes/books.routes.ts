import { Router } from "express";
import { getMyBooks, addBook, deleteBook } from "../controllers/book.controller";
import authMiddleware from "../middlewares/auth";

const bookRoutes = Router();

bookRoutes.get("/", authMiddleware, getMyBooks);
bookRoutes.post("/", authMiddleware, addBook);
bookRoutes.delete("/:id", authMiddleware, deleteBook);

export default bookRoutes;
