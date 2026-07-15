// ===============================
// CART DATA
// ===============================

const cartData =
    JSON.parse(localStorage.getItem("cart")) || [];

// Upgrade old cart items (without quantity)
cartData.forEach(item => {
    if (!item.quantity) {
        item.quantity = 1;
    }
});

// ===============================
// DOM ELEMENTS
// ===============================

const cartItems =
    document.getElementById("cartItems");

const subtotal =
    document.getElementById("subtotal");

const totalItems =
    document.getElementById("totalItems");

// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cartData)
    );

}

// ===============================
// UPDATE NAVBAR CART COUNT
// ===============================

function updateNavbarCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalQuantity =
        cartData.reduce((sum, item) => {

            return sum + item.quantity;

        }, 0);

    cartCount.textContent =
        totalQuantity;

}

// ===============================
// RENDER CART
// ===============================

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    // ---------- Empty Cart ----------

    if (cartData.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>Your Amazon Cart is empty.</h2>

                <p>Browse products and add them to your cart.</p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>

        `;

        subtotal.textContent = "0";
        totalItems.textContent = "0";

        saveCart();
        updateNavbarCount();

        return;

    }

    // ---------- Products ----------

    cartData.forEach(item => {

        const image =
            item.images?.[0] || item.image;

        total +=
            item.price * item.quantity;

        totalQuantity +=
            item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${image}" alt="${item.name}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <h2>${formatPrice(item.price)}</h2>

                <div class="qty-controls">

                    <button
                        class="minus"
                        data-id="${item.id}">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="plus"
                        data-id="${item.id}">
                        +
                    </button>

                </div>

                <button
                    class="delete-btn"
                    data-id="${item.id}">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

    subtotal.textContent =
    formatPrice(total);

    totalItems.textContent =
        totalQuantity;

    saveCart();

    updateNavbarCount();

    addEvents();

}

// ===============================
// BUTTON EVENTS
// ===============================

function addEvents() {

    // ---------- PLUS ----------

    document.querySelectorAll(".plus").forEach(btn => {

        btn.addEventListener("click", () => {

            const id =
                Number(btn.dataset.id);

            const item =
                cartData.find(product => product.id === id);

            item.quantity++;

            renderCart();

        });

    });

    // ---------- MINUS ----------

    document.querySelectorAll(".minus").forEach(btn => {

        btn.addEventListener("click", () => {

            const id =
                Number(btn.dataset.id);

            const item =
                cartData.find(product => product.id === id);

            item.quantity--;

            if (item.quantity <= 0) {

                const index =
                    cartData.findIndex(product => product.id === id);

                cartData.splice(index, 1);

            }

            renderCart();

        });

    });

    // ---------- DELETE ----------

    document.querySelectorAll(".delete-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const id =
                Number(btn.dataset.id);

            const index =
                cartData.findIndex(product => product.id === id);

            cartData.splice(index, 1);

            renderCart();

        });

    });

}

// ===============================
// INITIAL LOAD
// ===============================

renderCart();