const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const products = [
    { name: "Laptop", price: 80000, image: "laptop.png" },
    { name: "Mouse", price: 1500, image: "mouse.png" },
    { name: "Keyboard", price: 2000, image: "keyboard.png" },
    { name: "Phone", price: 30000, image: "phone.png" },
    { name: "Headphones", price: 2500, image: "headphones.png" },
    { name: "Earphones", price: 500, image: "earphones.png" }

];

async function seed() {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Products seeded to MongoDB');
    mongoose.connection.close();
}

seed();
