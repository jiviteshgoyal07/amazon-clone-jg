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