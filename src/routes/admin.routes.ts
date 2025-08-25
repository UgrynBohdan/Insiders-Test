import authMiddleware from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import * as adminController from '../controllers/admin.controller'
import { Router } from "express";

const adminRouter = Router()

// --- Admin only ---
adminRouter.get("/users", authMiddleware, checkRole(["Admin"]), adminController.getUsers);
adminRouter.get("/users/:id", authMiddleware, checkRole(["Admin"]), adminController.getUser);
adminRouter.put("/users/:id", authMiddleware, checkRole(["Admin"]), adminController.updateUser);
adminRouter.delete("/users/:id", authMiddleware, checkRole(["Admin"]), adminController.deleteUser);

export default adminRouter