const wishlist =
    getWishlist();

const container =
    document.getElementById("wishlistItems");

renderWishlist();

function renderWishlist() {

    if (wishlist.length === 0) {

        container.innerHTML = `

        <h2>

            Your wishlist is empty.

        </h2>

        `;

        return;

    }

    container.innerHTML = "";

    wishlist.forEach(product => {

        container.innerHTML += `

<div class="wishlist-card">

    <img
        src="${product.images[0]}"
        alt="${product.name}"
    >

    <div class="wishlist-info">

        <h2>

            ${product.name}

        </h2>

        <div class="wishlist-price">

            ${formatPrice(product.price)}

        </div>

        <div class="wishlist-stock">

            ${product.stock ? "In Stock" : "Out of Stock"}

        </div>

    </div>

    <div class="wishlist-actions">

        <a
            href="product.html?id=${product.id}"
            class="view-btn"
        >

            View Product

        </a>

        <button
            class="remove-btn"
            data-id="${product.id}"
        >

            Remove

        </button>

    </div>

</div>

`;

    });

}
document.addEventListener("click", (event) => {

    if (!event.target.classList.contains("remove-btn")) {

        return;

    }

    const productId =
        Number(event.target.dataset.id);

    const updatedWishlist =
        wishlist.filter(
            item => item.id !== productId
        );

    saveWishlist(updatedWishlist);

    updateWishlistCount();

    location.reload();

});