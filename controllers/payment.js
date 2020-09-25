const asyncHandler = require("../middleware/asyncHandler");
const Payment = require("../models/Payment");
const chalk = require("chalk");
const midtransClient = require("midtrans-client");

// * env midtrans
// * Create Core API instance
const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "SB-Mid-server-vMgJOtss_zGeLfqAK_KNolSh",
  clientKey: "SB-Mid-client-9HOSFzP6dyj593ww",
});

// * @route POST /api/user/payments
// @desc    Register a User
// @access  Private
exports.payments = asyncHandler(async (req, res, next) => {
  const { productName, price } = req.body;
  const userId = req.user;

  // * Save To MongoDB
  await Payment.create({ user: userId, productName, price });
  const payment = await Payment.findOne({ user: userId })
    .populate("user", "username email")
    .sort({ _id: -1 });

  console.log(chalk.yellow.inverse(payment));

  let parameter = {
    payment_type: "gopay",
    transaction_details: {
      gross_amount: price,
      order_id: payment._id,
    },
    customer_details: {
      username: payment.user.username,
      email: payment.user.email,
    },
    gopay: {
      enable_callback: true,
      callback_url: "http://localhost:1000/",
    },
  };

  // charge transaction
  const chargeResponse = await core.charge(parameter);

  res.status(200).json({
    success: true,
    data: payment,
    chargeResponse,
  });
});
