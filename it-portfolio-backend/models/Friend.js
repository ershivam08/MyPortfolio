import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    name: String,
    profession: String,
    message: String,
    image: String, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Friend", friendSchema);
