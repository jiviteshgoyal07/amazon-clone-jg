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

function showToast({
    type = "success",
    title = "",
    message = "",
    action = null
}) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    const icon = {
        success: "✓",
        error: "✕",
        info: "ℹ",
        warning: "!"
    };

   toast.innerHTML = `
<div class="toast-body">

    <div class="toast-icon">
        ${icon[type] || "✓"}
    </div>

    <div class="toast-info">

        <div class="toast-title">
            ${title}
        </div>

        ${
            message
            ? `<div class="toast-message">
                    ${
                        message.length > 32
                        ? message.substring(0,32) + "..."
                        : message
                    }
               </div>`
            : ""
        }

    </div>

</div>

<div class="toast-progress"></div>
`;
    toast.classList.add("show");

    clearTimeout(toast.hideTimer);

    toast.hideTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

// ===============================
// ORDER UTILITIES
// ===============================

function generateOrderId(){

    return "ORD-" +
        Date.now().toString();

}

function formatOrderDate(){

    return new Date().toLocaleString(
        "en-IN",
        {
            dateStyle:"medium",
            timeStyle:"short"
        }
    );

}
