const params = new URLSearchParams(window.location.search);
const productId = params.get("id"); // Get product ID from URL
const apiURL = `https://static.cloud.noroff.dev/api/gamehub/${productId}`;


async function fetchProductDetails() {
    try {
        const response = await fetch(apiURL);
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

function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = { id, title, price };

    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        alert("Item already in cart!");
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
}

// Go back to homepage
function goBack() {
    window.history.back();
}

// Load product details on page load
fetchProductDetails();
