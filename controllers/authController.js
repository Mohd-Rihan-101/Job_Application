const User = require("../models/User");
const bcrypt = require("bcrypt");


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
    res.status(500).json({error : "Internal Server Error"});
  }
};

module.exports = {register}
