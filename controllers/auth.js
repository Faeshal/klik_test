const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../middleware/auth");

// * @route POST /api/auth/register
// @desc    Register a User
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPw = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: hashedPw });

  // * Generate Access Token Token
  const token = await generateAccessToken(user.id);

  // * Push Logs to Elastic
  // const logs=elasticPush(user)

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
    return next(new ErrorResponse("Please provide an email and password", 400));
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

  // * Push Logs to Elastic
  // const logs=elasticPush(user)

  res.status(200).json({
    success: true,
    token,
  });
});

// * @route   POST /api/auth/me
// @desc      Get current logged in user
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  console.log(chalk.yellow(req.user));
  const user = await User.findById(req.user);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Not Getting The Data" });
  }

  // * Push Logs to Elastic
  // const logs=elasticPush(user)

  return res.status(200).json({ success: true, data: user });
});
