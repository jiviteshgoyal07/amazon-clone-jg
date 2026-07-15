// ===============================
// COMMON.JS
// Shared functionality for all pages
// ===============================

// ===============================
// CART DATA
// ===============================

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

// Upgrade old cart items
cart.forEach(item => {

    if (!item.quantity) {
        item.quantity = 1;
    }

});

// ===============================
// UPDATE NAVBAR CART COUNT
// ===============================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalQuantity =
        cart.reduce((sum, item) => {

            return sum + item.quantity;

        }, 0);

    cartCount.textContent =
        totalQuantity;

}

updateCartCount();

// ===============================
// BACK TO TOP
// ===============================

const backToTop =
    document.querySelector(".back-to-top");

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}