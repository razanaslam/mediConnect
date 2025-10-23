import mongoose, { Schema, Document } from "mongoose";

interface Appointment extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientName: string;
  email: string;
  phone: string;
  reason: string;
  date: string;
  time: string;
  createdAt: Date;
  status:string
}

const appointmentSchema = new Schema<Appointment>({
  doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status:{type:String,required:true , default:"Pending"},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Appointment>("Appointment", appointmentSchema);
