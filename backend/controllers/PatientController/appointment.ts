import type { Request,Response } from "express";
import appointmentModel from "../../models/appointment.ts";

export const createAppointment = async(req:Request , res:Response)=>{
    try {
        const {doctorId,patientName,email,phone,reason,date,time}=req.body
        if (!doctorId || !patientName || !email || !phone || !reason || !date || !time) {
      return res.status(400).json({ error: "All fields are required." });
    }
      const newAppointment = new appointmentModel({
      doctorId,
      patientName,
      email,
      phone,
      reason,
      date,
      time,

    })
    await newAppointment.save()
    res.status(201).json({message:"Appointment sented successfully!"})
    } catch (error) {
        console.error("error creating appointment",error)
        res.status(500).json({error:"Failed to book appoinment ."})
    }
}

export default createAppointment