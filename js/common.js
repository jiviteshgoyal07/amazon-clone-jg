// ==========================================
// COMMON.JS
// Shared functionality for all pages
// ==========================================

// ===============================
// UPDATE NAVBAR CART COUNT
// ===============================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const cart =
        getCart();

    cartCount.textContent =
        getTotalQuantity(cart);

}

updateCartCount();


// ===============================
// BACK TO TOP
// ===============================

function initializeBackToTop() {

    const backToTop =
        document.querySelector(".back-to-top");

    if (!backToTop) return;

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ===============================
// NAVBAR EVENTS
// ===============================

function initializeNavbar() {

    initializeSearch();

}
function initializeSearch() {

    const input =
        document.querySelector(".search-input");

    const button =
        document.querySelector(".search-button");

    if (!input || !button) return;

    function performSearch() {

        const query = input.value.trim();

        if (query === "") return;

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

// ============================
// WISHLIST
// ============================

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

    const wishlist =
        getWishlist();

    const badge =
        document.getElementById("wishlistCount");

    if (!badge) return;

    badge.textContent =
        wishlist.length;

}
// ============================
// RECENTLY VIEWED
// ============================

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