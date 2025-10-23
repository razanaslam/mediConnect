import mongoose, { Schema, Document } from "mongoose";

export interface TempUser extends Document {
  username: string;
  email: string;
  role: "Doctor" | "Patient";
  category?: string; 
  password: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}

const otpUserSchema: Schema = new Schema<TempUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["Doctor", "Patient"], required: true, default: "Patient" },
  category: { type: String ,required: function () { return this.role === "Doctor"; } }, 
  password: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true } 
});

otpUserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<TempUser>("OtpUser", otpUserSchema);