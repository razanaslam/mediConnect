import type { Request, Response } from "express";
import appointmentModel from "../../models/appointment.ts";

const showAppoinment = async (req: Request, res: Response) => {
  try {
    const patientEmail = req.user?.email;
    const appoinment = await appointmentModel
      .find({ email: patientEmail })
      .sort({ date: 1, time: 1 })
      .limit(1)
      .populate("doctorId", "username email");
        if (!appoinment || appoinment.length === 0) {
      return res.status(200).json({ message: "No upcoming appointments" });
    }

    res.status(200).json({ appointment: appoinment[0] });
  } catch (error) {
    console.error("Error fetching next appointment:", error);
    res.status(500).json({ message: "Error fetching next appointment" });
  }
};

export default showAppoinment;