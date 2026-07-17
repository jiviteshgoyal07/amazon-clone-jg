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

    const title =
        document.getElementById("searchTitle");

    title.textContent =
        `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for "${params.get("q") || ""}"`;

    resultsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {

        resultsContainer.innerHTML = `
            <h2>No products found.</h2>
        `;

        return;
    }

    filteredProducts.forEach(product => {

        resultsContainer.innerHTML += `

<div class="search-card">

    <a href="product.html?id=${product.id}" class="search-image">

        <img src="${product.images[0]}">

    </a>

    <div class="search-info">

        <a href="product.html?id=${product.id}" class="search-title">

            ${product.name}

        </a>

        <div class="search-rating">

            ⭐⭐⭐⭐⭐
            <span>${product.rating}</span>

            (${product.reviews.toLocaleString()})

        </div>

        <div class="search-price-row">

            <span class="current-price">

                ${formatPrice(product.price)}

            </span>

            <span class="mrp">

                M.R.P.

                <del>${formatPrice(product.mrp)}</del>

            </span>

        </div>

        <div class="discount">

            Save ${product.discount}%

        </div>

        <div class="prime">

            ✔ Prime

        </div>

        <div class="delivery">

            FREE Delivery Tomorrow

        </div>

        <div class="search-stock">

            ${product.stock ? "In Stock" : "Out of Stock"}

        </div>

        <div class="search-buttons">

            <button
                class="add-cart-btn"
                data-id="${product.id}"
            >
                Add to Cart
            </button>

            <a
                href="product.html?id=${product.id}"
                class="view-product-btn"
            >
                View Product
            </a>

        </div>

    </div>

</div>

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

    showToast({
    type: "success",
    title: "Added to Cart",
    message: product.name,
    action: {
        text: "View Cart →",
        href: "cart.html"
    }
});

});

function applyFilters() {

    const selectedCategories =
        [...document.querySelectorAll(".category-filter:checked")]
            .map(item => item.value);

    const selectedPrice =
        document.querySelector('input[name="price"]:checked')?.value;

    filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(query);

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);

            let matchesPrice = true;

            if (selectedPrice === "100") {

                matchesPrice = product.price < 100;

            } else if (selectedPrice === "500") {

                matchesPrice =
                    product.price >= 100 &&
                    product.price <= 500;

            } else if (selectedPrice === "1000") {

                matchesPrice = product.price > 500;

            }

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            );

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

document
    .querySelectorAll('input[name="price"]')
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