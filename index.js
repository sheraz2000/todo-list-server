import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userroutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://client-2fmv.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

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