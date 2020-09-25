const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.post("/api/auth/register", authController.register);

router.post("/api/auth/login", authController.login);

router.get("/api/auth/me", protect, authController.getMe);

module.exports = router;
