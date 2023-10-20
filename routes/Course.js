import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourses,
  getCoursesForStudent,
  updateCourse,
} from "../controllers/Course.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCoursesForStudent);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
