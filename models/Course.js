import mongoose from "mongoose";

const CourseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    students: {
      type: [mongoose.Types.ObjectId],
      ref: "Student",
    },
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("Course", CourseSchema);
