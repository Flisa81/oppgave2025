const params = new URLSearchParams(window.location.search);
const productId = params.get("id"); // Get product ID from URL
const apiURL = `https://static.cloud.noroff.dev/api/gamehub/${productId}`;

async function fetchProducts() {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = `<p>Loading products...</p>`; // Add this before fetching

    try {
        const response = await fetch("https://static.cloud.noroff.dev/api/gamehub/");
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        data.forEach(displayProduct);
    } catch (error) {
        console.error("Error:", error);
        productContainer.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    }
}

// Load products on page load
fetchProducts();
