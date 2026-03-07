const express = require("express");
const { upgradeToPremium } = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/upgrade-to-premium", protect, upgradeToPremium);

module.exports = router;