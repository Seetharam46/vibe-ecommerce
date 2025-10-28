const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const newItem = new CartItem({ productId, qty });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('productId');
    const total = cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    res.json({ cartItems, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

exports.checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const total = cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    const receipt = { total, timestamp: new Date().toISOString() };
    await CartItem.deleteMany(); // clear cart
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Checkout failed" });
  }
};
