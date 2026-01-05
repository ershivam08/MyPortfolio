import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  addFriend,
  getFriends,
  deleteFriend,
} from "../controllers/friendController.js";

const router = express.Router();

router.get("/", getFriends);
router.post("/", protect, upload.single("image"), addFriend);
router.delete("/:id", protect, deleteFriend);

export default router;
