import { Router } from "express";
import { getMyBooks, addBook, deleteBook } from "../controllers/userBooks.controller";
import authMiddleware from "../middlewares/auth";

const userBooksRoutes = Router();

userBooksRoutes.get("/", authMiddleware, getMyBooks);
userBooksRoutes.post("/", authMiddleware, addBook);
userBooksRoutes.delete("/:id", authMiddleware, deleteBook);

export default userBooksRoutes;
