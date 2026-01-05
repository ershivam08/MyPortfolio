import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  const email = "shivamkumarsingh63724@gmail.com";
  const password = "Shivam@81";

  const exists = await Admin.findOne({ email });
  if (!exists) {
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashed });
    console.log("✅ Admin created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
};

export default seedAdmin;
