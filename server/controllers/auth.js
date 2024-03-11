const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if user already exits or not
    // console.log("req-body")
    const existingUser = await User.findOne({ email });
    // console.log("existingUser");
    // if user exits then
    if (existingUser) {
      // console.log("if existingUser true");
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    //if user not exist then
    //secure password of new user
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    //create entry for a new user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // console.log(newUser);
    newUser.password = undefined;

    res.status(200).json({
      success: true,
      data: newUser,
      message: "sign-in successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while signup",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "login credentials are incomplete or missing",
      });
    }

    //register user  hai kya?
    let registeredUser = await User.findOne({ email });
    if (!registeredUser) {
      return res.status(400).json({
        success: false,
        message: "user is not signed-up with this email. please sign-up",
      });
    }
    const payload = {
      email: registeredUser.email,
      id: registeredUser._id,
    };

    // validate password
    if (await bcrypt.compare(password, registeredUser.password)) {
      //if password correct{ create a JWT token }
      let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      registeredUser = registeredUser.toObject();

      registeredUser.token = token; // added our jwt token in that registered user object

      registeredUser.password = undefined; //hiding password for security (removing password from user object only , not from DB)

      //creating a cookie
      let options = {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      };
      //creating a cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token,
        registeredUser: registeredUser,
        message: "login successfully",
      });
    } else {
      //if pssword wrong
      return res.status(403).json({
        success: false,
        message: "wrong password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while login",
      error: error.message,
    });
  }
};

exports.google = async (req, res, next) => {

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log("inside if");
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, JWT_SECRET);
      user = user.toObject();

      user.token = token; // added our jwt token in that registered user object

      user.password = undefined;
      //creating a cookie
      let options = {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      };
      //creating a cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token,
        user: user,
        message: "google login successfully",
      });
    } else {
      console.log('inside else')
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      
      console.log("generatedPassword ", generatedPassword);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      let newUser = new User({
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
      newUser = newUser.toObject();

      newUser.token = token; // added our jwt token in that registered user object

      newUser.password = undefined;
      
      //creating a cookie
      let options = {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      };
      //creating a cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token,
        newUser: newUser,
        message: "Google login successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};
