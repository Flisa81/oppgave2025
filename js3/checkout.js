document.addEventListener("DOMContentLoaded", displayCart);

function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "<h2>Your Shopping Cart</h2>";

    if (cart.length === 0) {
        cartContainer.innerHTML += "<p>Your cart is empty.</p>";
        const checkoutBtn = document.getElementById("checkout-button");
        if (checkoutBtn) checkoutBtn.style.display = "none"; // Hide button properly
        return;
    }

    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.title}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
    });
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Refresh the cart
}

function checkout() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart"); // Clear cart after purchase
    window.location.href = "checkout-confirmation.html"; // Correct path
}
