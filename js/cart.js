// ===============================
// CART DATA
// ===============================

const cartData =
    JSON.parse(localStorage.getItem("cart")) || [];



const savedItems =
    JSON.parse(localStorage.getItem("savedItems")) || [];

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

    <div class="cart-image">
        <img src="${image}" alt="${item.name}">
    </div>

    <div class="cart-details">

        <h2 class="cart-title">
            ${item.name}
        </h2>

        <p class="stock">
            In Stock
        </p>

        <p class="delivery">
            Eligible for FREE Delivery
        </p>

       <div class="cart-actions">

    <select class="qty-select" data-id="${item.id}">

        ${Array.from(
            {
                length: Math.max(10, item.quantity)
            },
            (_, i) => `
        <option
            value="${i + 1}"
            ${item.quantity === i + 1 ? "selected" : ""}>
            Qty: ${i + 1}
        </option>
`
        ).join("")}

    </select>

    <span class="divider">|</span>

    <button
        class="delete-btn"
        data-id="${item.id}">
        Delete
    </button>

    <span class="divider">|</span>

    <button
        class="save-btn"
        data-id="${item.id}">
        Save for later
    </button>

    <span class="divider">|</span>

    <button
        class="share-btn">
        Share
    </button>

</div>

    </div>

    <div class="cart-price">

        ${formatPrice(item.price * item.quantity)}

    </div>

</div>
`;

    });

    subtotal.textContent =
        formatPrice(total);

    const summaryTotal =
        document.getElementById("summaryTotal");

    if (summaryTotal) {

        summaryTotal.textContent =
            formatPrice(total);

    }

    totalItems.textContent =
        totalQuantity;

    saveCart();

    updateNavbarCount();

    addEvents();

    renderSavedItems();

}
function renderSavedItems() {

    const savedContainer =
        document.getElementById("savedItems");

    if (!savedContainer) return;

    savedContainer.innerHTML = "";

    if (savedItems.length === 0) {

        savedContainer.innerHTML =
            "<p>No saved items.</p>";

        return;

    }

    savedItems.forEach(item => {

        const image =
            item.images?.[0] || item.image;

        savedContainer.innerHTML += `

<div class="saved-item">

    <img src="${image}">

    <div class="saved-info">

        <h3>${item.name}</h3>

        <p>${formatPrice(item.price)}</p>

        <button
            class="move-btn"
            data-id="${item.id}">
            Move to Cart
        </button>

        <button
            class="saved-delete-btn"
            data-id="${item.id}">
            Delete
        </button>

    </div>

</div>

`;

    });
    addSavedEvents();

}
function addSavedEvents() {

    // Move To Cart

    document.querySelectorAll(".move-btn")
        .forEach(btn => {

            btn.onclick = () => {

                const id =
                    Number(btn.dataset.id);

                const index =
                    savedItems.findIndex(
                        item => item.id === id
                    );

                if (index === -1) return;

                const item = savedItems[index];

                const existing =
                    cartData.find(
                        product => product.id === id
                    );

                if (existing) {

                    existing.quantity += item.quantity;

                }

                else {

                    cartData.push(item);

                }

                savedItems.splice(index, 1);

                saveCart();

                localStorage.setItem(
                    "savedItems",
                    JSON.stringify(savedItems)
                );

                renderCart();

                renderSavedItems();

            };

        });



    // Delete Saved Item

    document.querySelectorAll(".saved-delete-btn")
        .forEach(btn => {

            btn.onclick = () => {

                const id =
                    Number(btn.dataset.id);

                const index =
                    savedItems.findIndex(
                        item => item.id === id
                    );

                if (index === -1) return;

                savedItems.splice(index, 1);

                localStorage.setItem(
                    "savedItems",
                    JSON.stringify(savedItems)
                );

                renderSavedItems();

            };

        });

}
// ===============================
// BUTTON EVENTS
// ===============================

function addEvents() {

    document.querySelectorAll(".qty-select")
        .forEach(select => {

            select.addEventListener("change", () => {

                const id = Number(select.dataset.id);

                const item =
                    cartData.find(p => p.id === id);

                item.quantity =
                    Number(select.value);

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

    document.querySelectorAll(".save-btn")
        .forEach(btn => {

            btn.onclick = () => {

                const id =
                    Number(btn.dataset.id);

                const index =
                    cartData.findIndex(
                        item => item.id === id
                    );

                if (index === -1) return;

                savedItems.push(cartData[index]);

                cartData.splice(index, 1);

                saveCart();

                localStorage.setItem(
                    "savedItems",
                    JSON.stringify(savedItems)
                );

                renderCart();

                renderSavedItems();

            };

        });



}


// ===============================
// INITIAL LOAD
// ===============================

renderCart();
renderSavedItems();