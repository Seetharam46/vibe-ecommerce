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

// 🗑️ Delete Item from Cart
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting cart item' });
  }
});

// ✏️ Update Cart Item Quantity
router.put('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

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
