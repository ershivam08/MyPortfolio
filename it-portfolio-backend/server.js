import dotenv from "dotenv";
dotenv.config(); // 👈 MUST BE FIRST

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import seedAdmin from "./utils/seedAdmin.js";

import authRoutes from "./routes/authRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";

connectDB();
seedAdmin();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
