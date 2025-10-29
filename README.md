# 🛍️ Vibe Ecommerce – Full Stack MERN Cart Application

A simple yet powerful **E-commerce web app** built with the **MERN Stack (MongoDB, Express, React, Node.js)**.
Users can browse products, add items to the cart, update quantities, and complete checkout with ease.

## 🖼️ Project Preview

### 🏠 Home Page
![Home Page](https://raw.githubusercontent.com/Seetharam46/vibe-ecommerce/main/screenshots/home.png)

### 🛒 Cart Page
![Cart Page](https://raw.githubusercontent.com/Seetharam46/vibe-ecommerce/main/screenshots/cart.png)

### 💳 Checkout Page
![Checkout Page](https://raw.githubusercontent.com/Seetharam46/vibe-ecommerce/main/screenshots/checkout.png)

### 💳 Order Placed
![Order Success](https://raw.githubusercontent.com/Seetharam46/vibe-ecommerce/main/screenshots/order-success.png)

---

## 🚀 Features

✅ **Product Listing** — Dynamic products loaded from MongoDB
✅ **Add to Cart** — Add and update quantities instantly
✅ **Cart Management** — Increase, decrease, or remove products
✅ **Checkout System** — Collects user details (name, email)
✅ **Dynamic Total** — Auto-calculated totals
✅ **Image Rendering** — Displays images from `/images` folder or URLs
✅ **RESTful API** — Clean and modular backend routes
✅ **MongoDB Integration** — Pre-seeded products for instant testing

---

## 🛠️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/mock-ecom-cart.git
cd mock-ecom-cart
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3️⃣ Configure MongoDB

Ensure MongoDB is running locally **or** connect to MongoDB Atlas.
Then create a `.env` file inside the `/backend` folder:

```
MONGO_URI=mongodb://localhost:27017/ecomcart
PORT=5000
```

---

### 4️⃣ Seed Database

This populates initial products into MongoDB.

```bash
cd backend
node seedProducts.js
```

---

### 5️⃣ Run the Project (Development Mode)

#### 🧩 Option 1: Run Separately

**Backend (Port 5000):**

```bash
cd backend
npm start
```

**Frontend (Port 3000):**

```bash
cd frontend
npm start
```

Then open 👉 http://localhost:3000

Add this to **root `package.json`**:

```json
"scripts": {
  "start": "node backend/server.js",
  "server": "cd backend && nodemon server.js",
  "client": "cd frontend && npm start",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

Now simply run:

```bash
npm run dev
```

---

## 🧾 API Endpoints Summary

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/products`      | Fetch all products       |
| POST   | `/api/cart`          | Add product to cart      |
| GET    | `/api/cart`          | Get all cart items       |
| PUT    | `/api/cart/:id`      | Update quantity          |
| DELETE | `/api/cart/:id`      | Delete product from cart |
| POST   | `/api/cart/checkout` | Checkout and clear cart  |

## 💻 Technologies Used

* **Frontend:** React.js (Hooks, Axios)
* **Backend:** Node.js + Express.js
* **Database:** MongoDB (Mongoose)
* **Styling:** Pure CSS / Inline styles
* **Dev Tools:** Nodemon, Concurrently

---

## 🎯 Author

**Vibe Ecommerce Screening Project**
Developed for demonstration & screening purposes.
