import { Router } from 'express'

import authMiddleware from '../middlewares/auth'
import { register, login } from "../controllers/auth.controller";

const router = Router()

router.post("/register", register);
router.post("/login", login);

// router.delete('/', authMiddleware, controllers.deleteUser)

export default router