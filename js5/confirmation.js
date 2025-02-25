function checkout() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart"); // Clear cart after purchase
    window.location.href = "checkout-confirmation.html"; // Correct path
}
