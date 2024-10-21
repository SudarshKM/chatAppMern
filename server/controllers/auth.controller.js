import bycrypt from "bcryptjs";

import User from "../models/user.model.js";
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

      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log("Error in signUpController", error.message);

    res.status(401).json(error);
  }
};


export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = bycrypt.compareSync(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res)


    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic  
    })
    
  } catch (error) {
    console.log("Error in logInController", error.message);

    res.status(401).json(error);
  }
};


export const logOut = (req, res) => {
  try {

    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully"})
     
  } catch (error) {
    console.log("Error in logOutController", error.message);

    res.status(401).json(error); 
  }
};
