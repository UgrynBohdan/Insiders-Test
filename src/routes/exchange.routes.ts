import { Router } from "express";
import { requestExchange } from "../controllers/exchange.controller";
import authMiddleware from "../middlewares/auth";

const exchangeRouter = Router();

exchangeRouter.post("/books/:id/request-exchange", authMiddleware, requestExchange);

export default exchangeRouter;
