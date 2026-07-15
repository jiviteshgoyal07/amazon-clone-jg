const cartData =
    JSON.parse(localStorage.getItem("cart")) || [];

const cartItems =
    document.getElementById("cartItems");

const subtotal =
    document.getElementById("subtotal");

const totalItems =
    document.getElementById("totalItems");

console.log(cartData);
console.log(cartItems);
console.log(subtotal);
console.log(totalItems);

let total = 0;

cartData.forEach(item => {

    const image =
        item.images?.[0] || item.image;

    total += item.price;

    cartItems.innerHTML += `
        <div class="cart-item">

            <img src="${image}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <h2>$${item.price}</h2>

            </div>

        </div>
    `;

});

subtotal.textContent =
     total.toLocaleString();

totalItems.textContent =
    cartData.length;