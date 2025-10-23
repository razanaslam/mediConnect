import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.ts";
import { verifyRole } from "../middleware/verifyRole.ts";
import dashboard from "../controllers/PatientController/dasboard.ts";
import doctors from "../controllers/PatientController/doctorList.ts";
import createAppointment from "../controllers/PatientController/appointment.ts";
import showAppoinment from "../controllers/PatientController/showAppointment.ts";
import getAppointment from "../controllers/PatientController/getAppointment.ts";
import cancelAppointment from "../controllers/PatientController/cancelAppointment.ts";

const patientRouter = Router()

patientRouter.get("/dashboard",verifyToken,verifyRole(["Patient"]),dashboard)
patientRouter.get("/doctorList",verifyToken,verifyRole(['Patient']),doctors)
patientRouter.post("/appoinment",verifyToken,verifyRole(['Patient']),createAppointment)
patientRouter.get("/show-appoinment",verifyToken,verifyRole(['Patient']),showAppoinment)
patientRouter.get("/appointment", verifyToken, verifyRole(['Patient']),getAppointment);
patientRouter.put("/cancelAppointment/:id", verifyToken,verifyRole(['Patient']), cancelAppointment);


export default patientRouter