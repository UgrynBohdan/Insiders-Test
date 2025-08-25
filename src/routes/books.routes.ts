import { Router } from "express";
import { getBookById, getBooks } from "../controllers/books.controller";

const booksRoutes = Router();

booksRoutes.get("/", getBooks);
booksRoutes.get("/:id", getBookById);

export default booksRoutes;
