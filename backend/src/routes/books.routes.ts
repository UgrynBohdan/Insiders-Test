import { Router } from "express";
import { getBookById, getBooks } from "../controllers/books.controller";
import authMiddleware from "../middlewares/auth";
import { requestExchange } from "../controllers/exchange.controller";

const booksRoutes = Router();

booksRoutes.get("/", getBooks);
booksRoutes.get("/:id", getBookById);
booksRoutes.post("/:id/request-exchange", authMiddleware, requestExchange);

export default booksRoutes;
