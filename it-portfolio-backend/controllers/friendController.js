import Friend from "../models/Friend.js";

export const addFriend = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image not received" });
    }

    const { name, profession, message } = req.body;

    const friend = await Friend.create({
      name,
      profession,
      message,
      image: req.file.path,
    });

    res.status(201).json(friend);
  } catch (error) {
    console.error("ADD FRIEND ERROR FULL:", error);
    res.status(500).json({
      message: "Friend creation failed",
      error: error.message,
    });
  }
};

export const getFriends = async (req, res) => {
  const friends = await Friend.find().sort({ createdAt: -1 });
  res.json(friends);
};

export const deleteFriend = async (req, res) => {
  await Friend.findByIdAndDelete(req.params.id);
  res.json({ message: "Friend deleted" });
};
