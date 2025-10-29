const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const products = [
  { name: "Laptop", price: 80000, image: "laptop.jpg" },
  { name: "Mouse", price: 1500, image: "mouse.jpg" },
  { name: "Keyboard", price: 2000, image: "keyboard.jpg" },
  { name: "Phone", price: 30000, image: "phone.jpeg" },
  { name: "Headphones", price: 2500, image: "headphones.jpg" },
  { name: "Earphones", price: 500, image: "earphones.jpg" },
];


async function seed() {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Products seeded to MongoDB');
    mongoose.connection.close();
}

seed();
