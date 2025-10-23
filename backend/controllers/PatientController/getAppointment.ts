import type { Request, Response } from "express";
import appointmentModel from "../../models/appointment.ts";

const getAppointment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const appoinments = await appointmentModel
      .find({ email: user?.email })
      .populate("doctorId", "username category")
      .sort({ date: -1, time: -1 });
    res.json({appoinments})
  } catch (err) {
    res.status(500).json({ message: "Server error from getAppoints", error: err });
  }
};

export default getAppointment;
