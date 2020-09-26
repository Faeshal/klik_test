const asyncHandler = require("../middleware/asyncHandler");
const Payment = require("../models/Payment");
const chalk = require("chalk");
const winston = require("winston");
const Elasticsearch = require("winston-elasticsearch");
const midtrans = require("../middleware/midtrans");

// * Elastic
const esTransportOpts = {
  level: "info",
  clientOpts: {
    node: "http://localhost:9200",
    log: "info",
  },
};

// * @route POST /api/user/payments
// @desc    Register a User
// @access  Private
exports.createPayments = asyncHandler(async (req, res, next) => {
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

  // * charge transaction
  const chargeResponse = await midtrans.charge(parameter);

  // * Push Logs to Elastic
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {
      host: `${req.protocol}://${req.get("host")}`,
      method: req.method,
      url: req.originalUrl,
    },
    transports: [new Elasticsearch.ElasticsearchTransport(esTransportOpts)],
  });
  logger.info(`createPayment_Success-${payment.user.email}`);

  res.status(200).json({
    success: true,
    data: payment,
    chargeResponse,
  });
});

exports.listPayments = asyncHandler(async (req, res, next) => {
  const payment = await Payment.find().populate("user", "username email");
  console.log(payment);
  if (payment.length == 0) {
    return res
      .status(404)
      .json({ success: true, message: "Payment data is empty" });
  }
  // * Push Logs to Elastic
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {
      host: `${req.protocol}://${req.get("host")}`,
      method: req.method,
      url: req.originalUrl,
    },
    transports: [new Elasticsearch.ElasticsearchTransport(esTransportOpts)],
  });
  logger.info(`getListPayments-${req.user}`);

  res.status(200).json({ success: true, total: payment.length, data: payment });
});
