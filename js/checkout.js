const cartData = getCart();

let orders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];

let shippingCharge = 0;

const summaryItems =
    document.getElementById("summaryItems");

const itemsPrice =
    document.getElementById("itemsPrice");

const shippingPrice =
    document.getElementById("shippingPrice");

const orderTotal =
    document.getElementById("orderTotal");

function updateSummary() {

    let subtotal = 0;

    let quantity = 0;

    cartData.forEach(item => {

        subtotal +=
            item.price * item.quantity;

        quantity +=
            item.quantity;

    });

    summaryItems.textContent =
        quantity;

    itemsPrice.textContent =
        formatPrice(subtotal);

    shippingPrice.textContent =
        shippingCharge === 0
            ? "FREE"
            : formatPrice(shippingCharge);

    orderTotal.textContent =
        formatPrice(
            subtotal + shippingCharge
        );

}

document
    .querySelectorAll(
        'input[name="delivery"]'
    )
    .forEach(option => {

        option.addEventListener(
            "change",
            () => {

                shippingCharge =
                    Number(option.value);

                updateSummary();

            }
        );

    });



const reviewItems =
    document.getElementById("reviewItems");

function renderReviewItems() {

    reviewItems.innerHTML = "";

    cartData.forEach(item => {

        const image =
            item.images?.[0] || item.image;

        reviewItems.innerHTML += `

<div class="review-item">

    <img src="${image}">

    <div class="review-details">

        <div class="review-title">

            ${item.name}

        </div>

        <div class="review-qty">

            Quantity : ${item.quantity}

        </div>

    </div>

    <div class="review-price">

        ${formatPrice(
            item.price * item.quantity
        )}

    </div>

</div>

`;

    });

}

updateSummary();

renderReviewItems();

const placeOrderBtn =
    document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", placeOrder);

function placeOrder() {

    if (cartData.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const order = {

        id:
            generateOrderId(),

        date:
            formatOrderDate(),

        items:
            [...cartData],

        total:
            cartData.reduce((sum, item) => {

                return sum +
                    item.price * item.quantity;

            }, 0) + shippingCharge,

        shipping:
            shippingCharge === 0
                ? "Standard"
                : "Express"

    };

    orders.push(order);

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    localStorage.removeItem("cart");

    window.location.href =
        "success.html";

}