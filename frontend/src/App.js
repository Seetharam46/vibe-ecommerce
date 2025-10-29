import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <h2>Vibe Ecommerce Screening 🛒</h2>
        <div>
          <Link to="/" style={styles.link}>Products</Link>
          <Link to="/cart" style={styles.link}>Cart</Link>
          <Link to="/checkout" style={styles.link}>Checkout</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    background: "#1976d2",
    color: "#fff",
  },
  link: {
    margin: "0 15px",
    color: "#fff",
    textDecoration: "none",
  },
};

export default App;
