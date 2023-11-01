import express from "express";
import { configDotenv } from "dotenv";

import { connect } from "./db";
import todoRouter  from "./routes/todoRoutes"
configDotenv();
const cors = require("cors")
const PORT = process.env.PORT || 5000;
// connecting mongo DB
connect();



const app = express();
app.use(express.json());
app.use(cors())
app.use("/api",todoRouter)

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
