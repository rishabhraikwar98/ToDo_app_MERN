import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
