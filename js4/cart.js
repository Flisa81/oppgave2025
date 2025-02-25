function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = { id, title, price };

    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        alert("Item already in cart!");
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item removed from cart.");
}

// Function to display cart on Checkout Page
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <h2>${item.title}</h2>
                <p>Price: $${item.price}</p>
                <button onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
    });
}

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function fetchProductDetails() {
    try {
        const response = await fetch(`${apiURL}/${productId}`); // Use correct API path
        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        displayProductDetails(data.data);
    } catch (error) {
        alert("Error loading product. Please try again.");
        document.getElementById("product-details").innerHTML = `<p>Failed to load product details.</p>`;
    }
}

function displayProductDetails(product) {
    document.getElementById("product-details").innerHTML = `
        <h1>${product.title}</h1>
        <img src="${product.image.url}" alt="${product.image.alt}">
        <p>${product.description}</p>
        <p><strong>Genre:</strong> ${product.genre}</p>
        <p><strong>Released:</strong> ${product.released}</p>
        <p><strong>Age Rating:</strong> ${product.ageRating}+</p>
        <p><strong>Price:</strong> $${product.onSale ? `<span class="discounted">$${product.discountedPrice}</span> <del>$${product.price}</del>` : product.price}</p>
        <button onclick="addToCart('${product.id}', '${product.title}', ${product.discountedPrice || product.price})">Add to Cart</button>
    `;
}

// Call function when page loads
fetchProductDetails();
