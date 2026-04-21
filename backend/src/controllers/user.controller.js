import { User } from "../models/user.model.js";
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "all field are required" })

    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "email already exists" })
    }
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    })
    return res.status(201).json({ message: "user registered successfully", user: { _id: user._id, email: user.email, username: user.username } })
  } catch (error) {
    res.status(500).json({ message: "internal sever error", error: error.message });


  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    })

    if (!user) {
      return res.status(404).json({ message: "user not found" });

    }
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid password" })
    }
    return res.status(200).json({ message: "user logged in successfully", user: { _id: user._id, email: user.email, username: user.username } })

  } catch (error) {
    res.status(500).json({ message: "internal sever error", error: error.message });

  }

}

const logoutUser = async (req, res) => {
  try {
    // Implement logout logic here (e.g., invalidate token, clear session)
    return res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error.message });
  }

}

export {
  registerUser,
  loginUser,
  logoutUser
};
