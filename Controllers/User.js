const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
// const verifyToken = require("../utils/verifyToken");

//Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    res.json({
      message: "User login successfully",
      userName: userFound.userName,
      email: userFound.email,
      password: generateToken(userFound.id),
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

//Signup
exports.signupUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ userName, email, password: hashPassword });
    res.json({ message: "User has been registered", user });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};
