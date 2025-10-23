import otpUserModel from "../../models/otpUser.ts";
import userModel from "../../models/user.ts";
import type { Request, Response } from "express";

interface OtpRequest {
  otp: string;
  email: string;
}

const OtpVerification = async (req: Request, res: Response) => {
  try {
    console.log("Incoming OTP verification request:", req.body);
    const { otp, email } = req.body as OtpRequest;

    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const user = await otpUserModel.findOne({ email });
    console.log("Found OTP user:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "OTP not found for this email.",
      });
    }
if (user.expiresAt < new Date()) {
  await otpUserModel.deleteOne({ email });
  return res.status(400).json({
    success: false,
    message: "OTP has expired. Please register again.",
  });
}


    if (user.expiresAt < new Date()) {
      await otpUserModel.deleteOne({ email });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please register again.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    const newUser = new userModel({
      username: user.username,
      email: user.email,
      role: user.role,
      category: user.role === "Doctor" ? user.category : undefined,
      password: user.password,
      createdAt: new Date(),
    });
    await newUser.save();
console.log('hy ',newUser);

    await otpUserModel.deleteOne({ email });
console.log('hy',userModel);

    return res.status(200).json({
      success: true,
      message: "User verified successfully! You can now log in.",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        category: newUser.category,
      },
    });
  } catch (error: any) {
    console.error("Server Error in OTP Verification:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during OTP verification.",
      error: error.message,
    });
  }
};

export default OtpVerification;
