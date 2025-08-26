import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from "cookie-parser";

import * as errorMiddlewares from './middlewares/error';
import loggerMiddleware from './middlewares/logger';
import authRouters from './routes/auth.routes';
import booksRoutes from './routes/books.routes';
import userBooksRoutes from './routes/userBooks.routes';
import adminRouter from './routes/admin.routes';
import router from './routes/me.routes';

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(loggerMiddleware)

app.use('/api/admin', adminRouter)
app.use("/api/auth", authRouters)
app.use('/api/me/books', userBooksRoutes)
app.use("/api/books", booksRoutes)
app.use('/api/me', router)


app.use(errorMiddlewares.notFoundMiddleware)
app.use(errorMiddlewares.errorMiddleware)


const PORT = Number(process.env.AUTH_PORT)
const HOST = process.env.AUTH_HOST as string
app.listen(PORT, HOST, () => {
    console.log(`Сервер працює на http://${HOST}:${PORT}`);
});