import Course from "../models/Course.js";

// CREATE aLL COURSES
const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// GET ALL STUDENTS ENROLLED IN A COURSE
const getCoursesForStudent = async (req, res, next) => {
  console.log(req.params);
  try {
    const enrolledStudents = await Course.findById(req.params.id).populate(
      "students",
      "name"
    );
    res.status(200).json(enrolledStudents);
  } catch (error) {
    next(error);
  }
};

// CREATE A COURSE
const createCourse = async (req, res, next) => {
  const newCourse = new Course(req.body);
  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

// UPDATE COURSE
const updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// DELETE COURSE
const deleteCourse = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).send("Course has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

export {
  getCoursesForStudent,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
