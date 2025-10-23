import express from "express";
import type { Request, Response } from "express"; 
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import authRouter from "./routes/authRoutes.ts";
import adminRouter from "./routes/adminRoutes.ts";
import doctorRoutes from "./routes/doctorRoutes.ts";
import patientRoutes from "./routes/patientRoutes.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const db_url = process.env.mongoConnect;
mongoose
  .connect(db_url as string)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // allow frontend to connect
});

// Keep track of connected patients
const onlinePatients: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When a patient joins
  socket.on("joinPatient", (patientId: string) => {
    onlinePatients[patientId] = socket.id;
    console.log(`Patient joined: ${patientId}`);
  });

  // Disconnect handling
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let id in onlinePatients) {
      if (onlinePatients[id] === socket.id) delete onlinePatients[id];
    }
  });
});

// Function to send notification to a specific patient
export const sendNotification = (patientId: string, message: string) => {
  const socketId = onlinePatients[patientId];
  if (socketId) {
    io.to(socketId).emit("newNotification", { message });
  }
};

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
