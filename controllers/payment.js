require("dotenv").config();
const asyncHandler = require("../middleware/asyncHandler");
const Payment = require("../models/Payment");
const User = require("../models/User");
const chalk = require("chalk");
const midtrans = require("../middleware/midtrans");

// * @route POST /api/user/payments
// @desc    Create New Payment
// @access  Private
exports.createPayments = asyncHandler(async (req, res, next) => {
  let { productName, price, quantity } = req.body;
  if (!quantity || quantity == 0) {
    quantity = 1;
  }
  const userId = req.user;
  const total = price * quantity;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, Make sure input your correct JWT token first",
    });
  }

  await Payment.create({ user: userId, productName, quantity, price, total });
  const payment = await Payment.findOne({ user: userId })
    .populate("user", "username email")
    .sort({ _id: -1 });

  console.log(chalk.yellowBright.inverse(payment));

  let parameter = {
    payment_type: "gopay",
    transaction_details: {
      gross_amount: total,
      order_id: payment._id,
    },
    item_details: [
      {
        price: price,
        quantity: quantity,
        name: productName,
      },
    ],
    customer_details: {
      username: user.username,
      email: user.email,
    },
    gopay: {
      enable_callback: true, //optional
      callback_url: "http://localhost:1000/",
    },
  };

  // * charge transaction
  const chargeResponse = await midtrans.charge(parameter);

  res.status(201).json({
    success: true,
    data: payment,
    chargeResponse,
  });
});

// * @route GET /api/user/payments
// @desc    Get all payments list
// @access  Private
exports.listPayments = asyncHandler(async (req, res, next) => {
  const payment = await Payment.find().populate("user", "username email");
  if (payment.length == 0) {
    return res
      .status(404)
      .json({ success: true, message: "Payment data is empty" });
  }
  res.status(200).json({ success: true, total: payment.length, data: payment });
});
