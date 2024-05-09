const {
  hashPassword,
  isValidPassword,
  generateToken,
} = require("../helper/auth");
const db = require("../models/index.model");
const User = db.User;
const Company = db.Company;
require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
// User signUp
exports.registration = async (req, res) => {
  const {
    name,
    mobile,
    address,
    email,
    company_name,
    company_email,
    password,
  } = req.body;
  // Check for email and passowrd
  if (!(password && email)) {
    res.status(401).json({ message: "Email and Password Must Required" });
  } else {
    // check for existing user
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      res.status(400).json("Email already Registered!");
    }

    // Register new user
    if (!findUser) {
      const userCreated = await User.create({
        name,
        mobile,
        address,
        email,
        password: await hashPassword(password), //hashing password
      });

      const companyCreated = await Company.create({
        company_name,
        company_email,
      });
      res.status(201).json({ userCreated, companyCreated });
    }
  }
};

// Login the user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check for email and passowrd
  if (!(password && email)) {
    res.status(401).json({ message: "Email and Password Must Required" });
  } else {
    // Check for register User or not
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json("User not exist with this Email!");
    }

    // Check For Password Validation
    const validPassword = await isValidPassword(password, findUser.password);

    if (!validPassword) {
      res.status(400).json("Password Incorrect!");
    }

    if (validPassword) {
      const token = await generateToken({
        objectId: findUser._id,
        email: findUser.email,
        role: findUser.role,
      });

      res.status(200).json({
        userDetails: findUser,
        loginToken: token,
      });
    }
  }
};

// getUser by Id
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const getUserById = await User.findById(userId);

    if (getUserById) {
      res.status(200).json(getUserById);
    }
    if (!getUserById) {
      res.status(404).json("User not Found!");
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

//todo: Update user
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const findUser = await User.findOne({ _id: userId });
  if (!findUser) {
    res.status(404).json("User not Found!");
  }

  if (findUser) {
    const { name, mobile, address, email } = req.body;

    const token = req.headers.logintoken;
    const decode = jsonwebtoken.verify(token, process.env.SIGNING_KEY);
    const updated_by = decode.id;
    const checkEmail = await User.findOne({ email: email });
    const existUser = await User.findOne({ email: email, _id: userId });
    if (!checkEmail || existUser) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, mobile, address, email },
        { new: true }
      );
      return res.status(201).json(updatedUser);
    }

    if (checkEmail) {
      return res.status(400).json("Email already Registered!");
    }
  }
};
