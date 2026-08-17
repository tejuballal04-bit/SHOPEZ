const Cart = require("../models/Cart");

console.log("CART MODEL:", Cart);
console.log("CART CREATE:", typeof Cart.create);

const addToCart = async (req, res) => {
  try {
    const { product, quantity = 1, price } = req.body;

    const cartItem = await Cart.create({
      user: req.user.userId,
      product,
      quantity,
      price,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user.userId,
    }).populate("product");

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cartItem = await Cart.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        quantity,
      },
      {
        new: true,
      }
    ).populate("product");

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeFromCart,
};