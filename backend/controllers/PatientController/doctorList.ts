import type { Request,Response } from "express";
import userModel from "../../models/user.ts";

const doctors=async (req:Request,res:Response)=>{
    try {
    
        const user = await userModel.find({role:'Doctor'})
        res.status(200).json({ doctors:user });
    } catch (error) {
        
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
    }
}

export default doctors