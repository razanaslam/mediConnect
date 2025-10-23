import mongoose ,{Schema,Document}from "mongoose";
interface user extends Document{
    username: string;
  email: string;
  role: "Doctor" | "Patient";
   category?: string;  
  password: string;
  createdAt: Date;
}

const userSchema:   Schema = new Schema <user>({
   
       username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  role:     { type: String, enum: ["Doctor", "Patient"], required: true },
  category:{type:String,required: function () { return this.role === "Doctor"; } },
  password: { type: String, required: true },
  createdAt:{ type: Date, default: Date.now }
    
})

export default mongoose.model <user>('User',userSchema)