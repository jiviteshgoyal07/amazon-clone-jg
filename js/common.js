// ==========================================
// COMMON.JS
// Shared functionality for all pages
// ==========================================



// ==========================================
// LOAD SHARED COMPONENTS
// ==========================================

async function loadComponent(id, file) {

    const element =
        document.getElementById(id);

    if (!element) return;

    try {

        const response =
            await fetch(file);

        if (!response.ok) {

            throw new Error(
                `Unable to load ${file}`
            );

        }

        element.innerHTML =
            await response.text();

    }

    catch (error) {

        console.error(error);

    }

}



// ==========================================
// INITIALIZE COMMON LAYOUT
// ==========================================

async function initializeLayout() {

    await loadComponent(
        "navbar-container",
        "components/navbar.html"
    );

    await loadComponent(
        "footer-container",
        "components/footer.html"
    );

    initializeNavbar();

    initializeBackToTop();

    updateCartCount();

    updateWishlistCount();

}

document.addEventListener(
    "DOMContentLoaded",
    initializeLayout
);



// ==========================================
// NAVBAR
// ==========================================

function initializeNavbar() {

    initializeSearch();

}



// ==========================================
// SEARCH
// ==========================================

function initializeSearch() {

    const input =
        document.querySelector(".search-input");

    const button =
        document.querySelector(".search-button");

    if (!input || !button) return;

    function performSearch() {

        const query =
            input.value.trim();

        if (!query) return;

        window.location.href =
            `search.html?q=${encodeURIComponent(query)}`;

    }

    button.addEventListener(
        "click",
        performSearch
    );

    input.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );

}



// ==========================================
// BACK TO TOP
// ==========================================

function initializeBackToTop() {

    const backToTop =
        document.querySelector(".back-to-top");

    if (!backToTop) return;

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}



// ==========================================
// CART
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const cart =
        getCart();

    cartCount.textContent =
        getTotalQuantity(cart);

}



// ==========================================
// WISHLIST
// ==========================================

function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

}

function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}

function updateWishlistCount() {

    const badge =
        document.getElementById("wishlistCount");

    if (!badge) return;

    const count = getWishlist().length;

    badge.textContent = count;

    badge.style.display =
        count > 0 ? "inline" : "none";

}



// ==========================================
// RECENTLY VIEWED
// ==========================================

function getRecentlyViewed() {

    return JSON.parse(
        localStorage.getItem("recentlyViewed")
    ) || [];

}

function saveRecentlyViewed(items) {

    localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(items)
    );

}