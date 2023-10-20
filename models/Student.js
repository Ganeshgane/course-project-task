import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courses: {
      type: [mongoose.Types.ObjectId],
      ref: "Course",
    },
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("Student", StudentSchema);
