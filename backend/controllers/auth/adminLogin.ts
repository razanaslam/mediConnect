import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface admin {
  email: string;
  password: string;
}

const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as admin;
    const adminEmail = process.env.adminEmail;
    const adminPass = process.env.adminPass;
    if (!adminEmail || !adminPass) {
      return res.status(400).json({
        success: false,
        message: "admin details not founded",
      });
    }
    if (email !== adminEmail) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email . Please try again",
      });
    }
    if (password !== adminPass) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password . Please try again",
      });
    }
    const token = jwt.sign(
      { email: adminEmail, role: "Admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin successfully logged In",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: `something happened wrong : ${error}`,
    });
  }
};

export default adminLogin;
