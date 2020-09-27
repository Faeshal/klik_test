require("dotenv").config();
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../middleware/auth");

// * @route POST /api/auth/register
// @desc    Register a User
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // * Validate
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All Field is Required" });
  }

  const hashedPw = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: hashedPw });

  // * Generate Access Token
  const token = await generateAccessToken(user.id);

  res.status(200).json({
    success: true,
    data: {
      user: user.username,
      email: user.email,
      token,
    },
  });
});

// * @route POST /api/auth/login
// @desc    Login a User
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  // * Validate email & password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide an email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (user === null) {
    return res.status(404).json({
      success: false,
      message: "A user with this data could not be found.",
    });
  }

  loadedUser = user;
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return res
      .status(401)
      .json({ succes: false, message: "Password is Not Match" });
  }

  // * Generate Access Token
  const token = await generateAccessToken(loadedUser.id);

  res.status(200).json({
    success: true,
    token,
  });
});

// * @route   GET /api/auth/me
// @desc      Get current logged in user
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Not Getting The Data, Make sure input the correct Token",
    });
  }

  return res.status(200).json({ success: true, data: user });
});
