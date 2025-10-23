import { Router } from "express";
import registerUser from "../controllers/auth/registerController.ts";
import OtpVerification from "../controllers/auth/OtpVerification.ts";
import resendOtp from "../controllers/auth/resendOtpController.ts";
import login from "../controllers/auth/login.ts";
import adminLogin from "../controllers/auth/adminLogin.ts";


const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/OtpVerification", OtpVerification);
authRouter.post('/resendOtp',resendOtp)
authRouter.post('/login',login)
authRouter.post('/adminLogin',adminLogin)

export default authRouter;
