import express from "express";
import dot from "dotenv";
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connection.js";


const app = express();
const PORT = process.env.PORT || 5000;

dot.config();

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB()
  console.log("server running on PORT :", PORT);
});
