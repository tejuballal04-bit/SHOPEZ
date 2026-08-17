const express = require("express");
const router = express.Router();

const {
  addToCart,
  getMyCart,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addToCart);

router.get("/", protect, getMyCart);

router.delete("/:id", protect, removeFromCart);

module.exports = router;