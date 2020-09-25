const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");
const { protect } = require("../middleware/auth");

router.post("/api/user/payments", protect, paymentController.payments);

module.exports = router;
