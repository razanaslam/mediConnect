import type { Request, Response } from "express";
import appointmentModel from "../../models/appointment.ts";

const cancelAppointment = async (req: Request, res: Response) => {
 try {
     const user = req.user;
  const appoinmentId = req.params.id;
  if (!user) {
    return res.status(400).json({ message: "user is not founded" });
  }
  const appoinment = await appointmentModel.findOne({
    _id: appoinmentId,
    email: user.email,
    
  });
  console.log("id ",appoinmentId,"appoinment",appoinment);
  
  if(!appoinment){
    return res.status(404).json({message:"Appoinment not found"})
  }
  if(appoinment.status === "Cancelled"){
    return res.status(400).json({Message:"Appointment is already cancelled !"})
  }
  appoinment.status="Cancelled"
  await appoinment.save()
  res.json({message:"Appointment is cancelled successfully",appoinment})
 } catch (err) {
    console.error("Error cancelling appointment:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

export default cancelAppointment