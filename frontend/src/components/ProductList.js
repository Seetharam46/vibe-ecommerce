import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading products...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red", marginTop: "100px" }}>{error}</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🛍️ Vibe Ecommerce Screening</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img
              src={`http://localhost:5000/images/${product.image}`} 
              alt={product.name}
              style={styles.image}
              onError={(e) => (e.target.src = "/images/placeholder.png")}
            />
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>₹{product.price}</p>
            <button
              style={styles.button}
              onClick={async () => {
                try {
                  await axios.post("http://localhost:5000/api/cart", {
                    productId: product._id,
                    qty: 1,
                  });
                  alert("✅ Added to cart!");
                } catch (err) {
                  alert("❌ Error adding to cart");
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f4f6f8",
    minHeight: "90vh",
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1e40af",
    fontSize: "1.8rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "25px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "15px",
    textAlign: "center",
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  name: {
    fontSize: "1rem",
    color: "#333",
    margin: "5px 0",
  },
  price: {
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "10px",
  },
  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default ProductList;
