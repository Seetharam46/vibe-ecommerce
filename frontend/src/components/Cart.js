import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState("");

    // Fetch cart items
    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/cart");
            setCart(res.data.cart || []);
            setTotal(res.data.total || 0);
        } catch (err) {
            console.error(err);
            setError("Error fetching cart");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Update quantity
    const updateQty = async (id, qty) => {
        if (qty < 1) return;
        try {
            await axios.put(`http://localhost:5000/api/cart/${id}`, { qty });
            fetchCart();
        } catch (err) {
            alert("Error updating cart");
        }
    };

    // Delete item
    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${id}`);
            fetchCart();
        } catch (err) {
            alert("Error deleting item");
        }
    };

    if (error)
        return <p style={{ color: "red", textAlign: "center", marginTop: "100px" }}>{error}</p>;

    if (!cart.length)
        return <p style={{ textAlign: "center", marginTop: "100px" }}>🛒 Your cart is empty</p>;

    return (
        <div style={styles.page}>
            <h2 style={styles.heading}>🛍️ Your Cart</h2>

            <div style={styles.cartContainer}>
                {cart.map((item) => (
                    <div key={item.product._id} style={styles.cartItem}>
                        <img
                            src={`http://localhost:5000/images/${item.product.image}`}
                            alt={item.product.name}
                            style={styles.image}
                            onError={(e) => (e.target.src = "/images/placeholder.png")}
                        />

                        <div style={styles.details}>
                            <h3 style={styles.name}>{item.product.name}</h3>
                            <p style={styles.price}>₹{item.product.price}</p>
                        </div>

                        <div style={styles.qtyBox}>
                            <button style={styles.qtyBtn} onClick={() => updateQty(item.product._id, item.qty - 1)}>
                                −
                            </button>
                            <span style={styles.qtyText}>{item.qty}</span>
                            <button style={styles.qtyBtn} onClick={() => updateQty(item.product._id, item.qty + 1)}>
                                +
                            </button>
                        </div>

                        <button
                            style={styles.deleteBtn}
                            onClick={() => deleteItem(item.product._id)}
                            title="Remove item"
                        >
                            🗑
                        </button>
                    </div>
                ))}
            </div>

            <div style={styles.summary}>
                <h3 style={styles.total}>Total: ₹{total}</h3>
                <a href="/checkout" style={styles.checkoutBtn}>
                    Proceed to Checkout
                </a>
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
        marginBottom: "25px",
        color: "#1e40af",
        fontSize: "1.8rem",
    },
    cartContainer: {
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "20px",
    },
    cartItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
        padding: "10px 0",
    },
    image: {
        width: "80px",
        height: "80px",
        objectFit: "contain",
        marginRight: "10px",
    },
    details: {
        flex: "1",
        paddingLeft: "10px",
    },
    name: {
        fontSize: "1rem",
        color: "#333",
        margin: "5px 0",
    },
    price: {
        fontWeight: "600",
        color: "#2563eb",
    },
    qtyBox: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    qtyBtn: {
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "4px 8px",
        cursor: "pointer",
        fontSize: "16px",
    },
    qtyText: {
        minWidth: "20px",
        textAlign: "center",
        fontWeight: "bold",
    },
    deleteBtn: {
        background: "transparent",
        border: "none",
        color: "red",
        fontSize: "18px",
        cursor: "pointer",
    },
    summary: {
        textAlign: "center",
        marginTop: "30px",
    },
    total: {
        fontSize: "1.3rem",
        color: "#333",
        marginBottom: "15px",
    },
    checkoutBtn: {
        display: "inline-block",
        background: "#2563eb",
        color: "#fff",
        padding: "10px 25px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "600",
    },
};

export default Cart;
