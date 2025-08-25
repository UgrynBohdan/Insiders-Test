import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import * as errorMiddlewares from './middlewares/error';
import loggerMiddleware from './middlewares/logger';
import authRouters from './routes/auth.routes';
import booksRoutes from './routes/books.routes';
import userBooksRoutes from './routes/userBooks.routes';
import exchangeRouter from './routes/exchange.routes';

const app = express();
app.use(express.json())
app.use(cors())

app.use(loggerMiddleware)

app.use("/api/auth", authRouters)
app.use('/api/me/books', userBooksRoutes)
app.use("/api/books", booksRoutes)
app.use('/api', exchangeRouter)

app.use(errorMiddlewares.notFoundMiddleware)
app.use(errorMiddlewares.errorMiddleware)


const PORT = Number(process.env.AUTH_PORT)
const HOST = process.env.AUTH_HOST as string
app.listen(PORT, HOST, () => {
    console.log(`Сервер працює на http://${HOST}:${PORT}`);
});