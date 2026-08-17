const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteMyOrder,
} = require("../controllers/orderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);
router.delete("/:id", protect, deleteMyOrder);
module.exports = router;