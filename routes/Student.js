import express from "express";
import {
  courseEnrollment,
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "../controllers/Student.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/enrollment/:studentId/:courseId", courseEnrollment); // To enroll a student to the particular course

export default router;
