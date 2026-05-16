import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userroutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.send("Welcome to the Todo List API");
});

app.use("/api/user", userRoute);

const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));