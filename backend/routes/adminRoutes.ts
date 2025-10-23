import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.ts";
import { verifyRole } from "../middleware/verifyRole.ts";
import dashboard from "../controllers/adminController/dashboard.ts";

const adminRouter = Router()

adminRouter.get("/admin/dashboard",verifyToken,verifyRole(["Admin"]),dashboard)

export default adminRouter