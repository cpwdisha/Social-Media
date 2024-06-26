import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function register(req, resp) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    resp.status(201).json(savedUser);
  } catch (error) {
    resp.status(500).json({ error: error });
  }
}

/* LOGGING IN */
export async function login(req, resp) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      resp.status(400).json({ message: "User does not exist" });
    }
    /* Matching the password in database and from frontend  */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      resp.status(400).json({ message: "Invalid Credentials." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //deleting so not to send password to the frontend
    const userWithoutPassword = { ...user.toObject(), password: undefined };
    //sending back token and the email
    resp.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    resp.status(500).json({ error: error });
  }
}
