const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get("/admin-test", (req, res) => {
  res.status(200).json({
    message: "ADMIN ROUTE IS WORKING",
  });
});

router.get("/test", (req, res) => {
  res.status(200).send("User route working");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

router.get(
  "/admin",
  protect,
  adminOnly,
  getAllUsers
);

module.exports = router;