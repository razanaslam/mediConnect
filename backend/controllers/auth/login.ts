import type { Request, Response } from "express";
import userModel from "../../models/user.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginData {
  email: string;
  role?: "Doctor" | "Patient";
  password: string;
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, role, password } = req.body as LoginData;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid user. Please try again.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Incorrect password. Please try again.",
      });
    }

    if (role && role !== user.role) {
      return res.status(400).json({
        status: false,
        message: `Incorrect role selected.`,
      });
    }

    const token = jwt.sign(
         { email: user.email, role: user.role },
         process.env.JWT_SECRET as string,
         { expiresIn: "365d" }
       );
   
    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again later.",
    });
  }
};

export default login;
