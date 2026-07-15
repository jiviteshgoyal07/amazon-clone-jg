// ==========================================
// UTILS.JS
// Shared utility functions
// ==========================================


// ===============================
// CART FUNCTIONS
// ===============================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

function getTotalQuantity(cart) {

    return cart.reduce((total, item) => {

        return total + (item.quantity || 1);

    }, 0);

}


// ===============================
// PRODUCT FUNCTIONS
// ===============================

function getProductById(id) {

    return window.products.find(product => {

        return product.id === id;

    });

}

function getRelatedProducts(productId) {

    return window.products.filter(product => {

        return product.id !== productId;

    });

}


// ===============================
// PRICE FORMAT
// ===============================

function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0
        }
    ).format(price);

}


// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}