const params = new URLSearchParams(window.location.search);

const query = (params.get("q") || "").toLowerCase();

document.getElementById("searchTitle").textContent =
    `Search results for "${params.get("q") || ""}"`;

const resultsContainer =
    document.getElementById("searchResults");

let filteredProducts = products.filter(product =>
    product.name
        .toLowerCase()
        .includes(query)
);

function renderProducts() {

    resultsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {

        resultsContainer.innerHTML = `
            <h2>No products found.</h2>
        `;

        return;
    }

    filteredProducts.forEach(product => {

        resultsContainer.innerHTML += `

        <!-- YOUR ENTIRE SEARCH CARD HTML -->

        `;

    });

}

renderProducts();
// ============================
// ADD TO CART FROM SEARCH
// ============================

document.addEventListener("click", (event) => {

    if (!event.target.classList.contains("add-cart-btn")) {

        return;

    }

    const productId =
        Number(event.target.dataset.id);

    const product =
        getProductById(productId);

    if (!product) {

        return;

    }

    const cart =
        getCart();

    const existingItem =
        cart.find(item => item.id === product.id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    saveCart(cart);

    updateCartCount();

    showToast("Added to Cart");

});

function applyFilters() {

    const selectedCategories =
        [...document.querySelectorAll(".category-filter:checked")]
            .map(item => item.value);

    filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(query);

            const matchesCategory =
                selectedCategories.length === 0
                || selectedCategories.includes(product.category);

            return matchesSearch && matchesCategory;

        });

    renderProducts();

}

document
.querySelectorAll(".category-filter")
.forEach(filter => {

    filter.addEventListener(
        "change",
        applyFilters
    );

});

const sortSelect =
    document.getElementById("sortSelect");

sortSelect.addEventListener("change", () => {

    switch (sortSelect.value) {

        case "low-high":

            filteredProducts.sort(
                (a, b) => a.price - b.price
            );

            break;

        case "high-low":

            filteredProducts.sort(
                (a, b) => b.price - a.price
            );

            break;

        case "rating":

            filteredProducts.sort(
                (a, b) => b.rating - a.rating
            );

            break;

        default:

            filteredProducts.sort(
                (a, b) => a.id - b.id
            );

    }

    renderProducts();

});