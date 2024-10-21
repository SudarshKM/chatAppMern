import bycrypt from "bcryptjs";

import User from "../routes/models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUP = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    //Hash password

    const salt = bycrypt.genSaltSync(10);
    const hashedPassword = bycrypt.hashSync(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {

        //generating JWT token

        generateTokenAndSetCookie(newUser._id , res)

      await newUser.save();

      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export const loginUser = (req, res) => {
  res.send("login");
};
export const logOut = (req, res) => {
  res.send("logOut");
};
