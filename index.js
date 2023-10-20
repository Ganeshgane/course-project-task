import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/Student.js";
import courseRoutes from "./routes/Course.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// routes
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json(errorMessage);
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, console.log("listening to port 5000"));
  })
  .catch((err) => console.log(err));
