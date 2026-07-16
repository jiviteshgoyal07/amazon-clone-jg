const orders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];

const ordersContainer =
    document.getElementById("ordersContainer");

renderOrders();

function renderOrders() {

    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <h2>No orders yet.</h2>
        `;

        return;
    }

    ordersContainer.innerHTML = "";

    orders.forEach(order => {

        ordersContainer.innerHTML += `

<div class="order-card">

    <div class="order-header">

        <div>
            <p>ORDER PLACED</p>
            <strong>${order.date}</strong>
        </div>

        <div>
            <p>TOTAL</p>
            <strong>${formatPrice(order.total)}</strong>
        </div>

        <div>
            <p>ORDER ID</p>
            <strong>${order.id}</strong>
        </div>

    </div>

    <div
        class="order-items"
        id="order-${order.id}">
    </div>

</div>

`;

        renderOrderItems(order);

    });

}

function renderOrderItems(order) {

    const container =
        document.getElementById(
            `order-${order.id}`
        );

    order.items.forEach(item => {

        const image =
            item.images?.[0] || item.image;

        container.innerHTML += `

<div class="order-item">

    <img
        src="${image}"
        alt="${item.name}"
    >

    <div class="order-info">

        <h3>${item.name}</h3>

        <p>
            Quantity:
            ${item.quantity}
        </p>

        <p class="delivery-status" >
            Delivered
        </p>

    </div>

    <div class="order-actions">

    <button
        class="buy-again-btn"
        data-id="${item.id}">
        Buy Again
    </button>

    <button
        class="view-btn"
        data-id="${item.id}">
        View Product
    </button>

</div>

</div>

`;

    });

}
// ===============================
// BUY AGAIN EVENTS
// ===============================

document
    .querySelectorAll(".buy-again-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            buyAgain
        );

    });


// ===============================
// BUY AGAIN
// ===============================

function buyAgain(event) {

    const id =
        Number(
            event.target.dataset.id
        );

    let cart = getCart();

    const product =
        getProductById(id);

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    }
    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    saveCart(cart);

    window.location.href = "cart.html";

}
document
    .querySelectorAll(".view-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            viewProduct
        );

    });

function viewProduct(event) {

    const id =
        Number(
            event.target.dataset.id
        );

    window.location.href =
        `product.html?id=${id}`;
}
