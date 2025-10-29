const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// 🛒 Add to Cart
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cartItem = await Cart.findOne({ product: productId });

    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      await Cart.create({ product: productId, qty });
    }

    res.json({ message: 'Added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

// 🛒 Get Cart
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find().populate('product');
    const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    res.json({ cart, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// 🗑️ Delete Item from Cart (by product ID)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({ product: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Item not found in cart' });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting cart item' });
  }
});

// ✏️ Update Cart Item Quantity (by product ID)
router.put('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    const cartItem = await Cart.findOne({ product: req.params.id });
    if (!cartItem) return res.status(404).json({ message: 'Item not found in cart' });

    cartItem.qty = qty;
    await cartItem.save();
    res.json({ message: 'Cart updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating cart item' });
  }
});

// 💳 Checkout
router.post('/checkout', async (req, res) => {
  try {
    const { name, email } = req.body;
    const cart = await Cart.find().populate('product');
    const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

    const receipt = {
      customer: { name, email },
      total,
      items: cart.map(i => ({
        product: i.product.name,
        qty: i.qty,
        price: i.product.price,
      })),
      date: new Date(),
    };

    await Cart.deleteMany(); // clear cart
    res.json({ message: 'Checkout complete', receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing checkout' });
  }
});

module.exports = router;
