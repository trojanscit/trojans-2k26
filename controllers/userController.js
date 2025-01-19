const User = require("../models/User");

const signInUser = async (req, res) => {
  const { userId, name, email, profile } = req.body;

  if (!userId || !name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ userId });

    if (user) {
      // User exists
      return res.status(200).json({ message: "User already exists", user });
    } else {
      // Create a new user
      user = new User({ userId, name, email, profile });
      await user.save();
      return res.status(201).json({ message: "User registered successfully", user });
    }
  } catch (error) {
    console.error("Error in signInUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signInUser,
};
