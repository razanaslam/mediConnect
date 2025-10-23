import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as crypto from "crypto";
import userModel from "../../models/user.ts";
import otpUserModel from "../../models/otpUser.ts";
import sendOtpEmail from "../../config/utils/sendEmail.ts";

interface RegisterBody {
  username: string;
  email: string;
  role?: "Doctor" | "Patient";
  category?: string;
  password: string;
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, role = "Patient", category, password } = req.body as RegisterBody;
    console.log("Incoming register request:", req.body);


    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please try again",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = crypto.randomInt(100000, 999999).toString();

    const newOtpUser = new otpUserModel({
      username,
      role,
      category: role === "Doctor" ? category : undefined, 
      email,
      password: hashedPassword,
      otp,
  createdAt: new Date(),
  expiresAt: new Date(Date.now() + 2 * 60 * 1000)  
});
await newOtpUser.save();

    await sendOtpEmail(email, Number(otp));

   return  res.status(201).json({
      success: true,
      message: "OTP sent successfully from registration",
      email
    });
    
  } catch (error: any) {
    console.error("Register Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong on registration",
      error: error.message,
    });
  }
};

export default registerUser;
