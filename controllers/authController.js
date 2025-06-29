const User = require("../models/User");
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

// register function
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400).json({ massage: "All fields are required" });
    }
    const user = await User.findOne({ username });

    if (user) {
      res.status(400).json({ massage: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(200).json({ massage: "Account Create Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//create Login function

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ massage: "All fields are required" });
    }

    //find by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ massage: "Incorrect username" });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ massage: "Password is incorrect " });
    }

    //  JWt token generatee
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECREt, {
      expiresIn: "2d",
    });

    // set token in cookei
    res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: process.env.JWT_SECRET === "production", // true in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }).json({
      _id : user._id,
      username : user.username,
      message : "Login Successful"
    })
  } catch (error) {
     console.error(error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = { register, login };
