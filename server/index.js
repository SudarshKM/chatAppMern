import express from "express";
import dot from "dotenv";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connection.js";
import { app, server } from "./socket/socket.js";



const PORT = process.env.PORT || 5000;

dot.config();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



server.listen(PORT, () => {
    connectToMongoDB()
  console.log("server running on PORT :", PORT);
});
