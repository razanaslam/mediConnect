import type { Request, Response } from "express";
import * as crypto from "crypto";
import otpUserModel from "../../models/otpUser.ts";
import sendOtpEmail from "../../config/utils/sendEmail.ts";

export const resendOtp = async (req: Request, res: Response) => {
    try {
        const email = req.body.email as string;
        
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }
        
        const user = await otpUserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "No pending registration found for this email. Please register again." 
            });
        }
        
        const newOtp = crypto.randomInt(100000, 999999).toString();
        const newExpiryTime = new Date(Date.now() + 2 * 60 * 1000); 

        user.otp = newOtp;
        user.expiresAt = newExpiryTime;
        await user.save(); 

        await sendOtpEmail(email, Number(newOtp));

        return res.status(200).json({
            success: true,
            message: "New OTP has been successfully sent to your email.",
            email
        });

    } catch (error: any) {
        console.error("Resend OTP Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error during OTP resend.", error: error.message });
    }
};

export default resendOtp;