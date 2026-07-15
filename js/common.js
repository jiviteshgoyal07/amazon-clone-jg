// ==========================
// COMMON.JS
// Runs on every page
// ==========================


// ---------- CART COUNT ----------
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");

if (cartCount) {
    cartCount.textContent = cart.length;
}

// ---------- BACK TO TOP ----------
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}