import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.ts";
import { verifyRole } from "../middleware/verifyRole.ts";
import dashboard from "../controllers/DoctorController/dashboard.ts";

const doctorRouter = Router()

doctorRouter.get("/doctor/dashboard",verifyToken,verifyRole(["Doctor"]),dashboard)

export default doctorRouter