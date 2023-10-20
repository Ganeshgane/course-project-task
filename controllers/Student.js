import Course from "../models/Course.js";
import Student from "../models/Student.js";
import { createError } from "../utils/createError.js";

// GET ALL STUDENTS
const getStudents = async (req, res, next) => {
  try {
    const Students = await Student.find();
    res.status(200).json(Students);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE STUDENT
const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "courses",
      "title"
    );

    if (!student)
      return next(createError(404, `No Student found with ${req.params.id}`));

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// CREATE STUDENT
const createStudent = async (req, res, next) => {
  const newStudent = new Student(req.body);
  try {
    const savedStudent = await newStudent.save();
    res.status(200).json(savedStudent);
  } catch (error) {
    next(error);
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedStudent)
      return next(createError(404, `No Student found with ${req.params.id}`));

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).send("Student has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

// COURSE ENROLLED BY STUDENT
const courseEnrollment = async (req, res, next) => {
  console.log(req.params, req.params.courseId, req.params.studentId);
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "students",
      "name"
    );
    if (!course)
      return next(
        createError(404, `No Student found with ${req.params.courseId}`)
      );

    const student = await Student.findById(req.params.studentId);

    if (!student)
      return next(
        createError(404, `No Student found with ${req.params.studentId}`)
      );

    const enrolledCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      {
        $push: {
          students: student,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    const enrolledStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        $push: {
          courses: course,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );
    res
      .status(200)
      .json(`Sucessfully enrolled to the course: ${enrolledCourse.title}`);
  } catch (error) {
    next(error);
  }
};

export {
  courseEnrollment,
  getStudent,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
