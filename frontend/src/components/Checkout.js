import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/cart/checkout", {
        name,
        email,
      });
      setReceipt(res.data.receipt);
    } catch (err) {
      console.error(err);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.successTitle}>✅ Order Successful!</h2>
          <p><strong>Receipt ID:</strong> R-{Date.now()}</p>
          <p style={styles.total}>Total: ₹{receipt.total}</p>
          <p>Thank you for shopping with <b>Vibe Ecommerce Screening!</b></p>
          <button onClick={() => navigate("/products")} style={styles.button}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💳 Secure Checkout</h2>
        <form onSubmit={handleCheckout} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
            style={styles.input}
          />

          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john@example.com"
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Checkout Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "30px 40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    animation: "fadeIn 0.4s ease",
  },
  title: {
    marginBottom: "20px",
    color: "#222",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "left",
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  },
  error: {
    color: "#dc2626",
    background: "#fee2e2",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center",
  },
  successTitle: {
    color: "#16a34a",
  },
  total: {
    fontSize: "1.2em",
    fontWeight: "600",
    color: "#2563eb",
  },
};

export default Checkout;
