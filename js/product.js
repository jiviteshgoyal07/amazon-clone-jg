const products = window.products;
// ============================
// GET PRODUCT ID FROM URL
// ============================

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id")) || 1;
const product =
    products.find(item => item.id === productId)
    || products[0];
const relatedProducts =
    products.filter(item => item.id !== product.id);

const reviews = [
    {
        name: "John D.",
        rating: "★★★★★",
        title: "Fantastic laptop",
        text: "Battery life is unbelievable. Perfect for coding, college work and travel."
    },
    {
        name: "Sarah M.",
        rating: "★★★★★",
        title: "Worth every penny",
        text: "Display is stunning and the M4 chip is extremely fast."
    },
    {
        name: "Michael R.",
        rating: "★★★★☆",
        title: "Excellent performance",
        text: "Very lightweight, premium build quality and smooth experience."
    },
    {
        name: "Emily K.",
        rating: "★★★★★",
        title: "Perfect for students",
        text: "Battery easily lasts all day and the keyboard is fantastic."
    },
    {
        name: "David L.",
        rating: "★★★★★",
        title: "Best MacBook yet",
        text: "Upgraded from an Intel Mac and the difference is incredible."
    }
];
// ============================
// FILL PRODUCT INFO
// ============================
document.getElementById("productTitle").textContent = product.name;
document.getElementById("ratingNumber").textContent = product.rating;
document.getElementById("reviewCount").textContent =
    `${product.reviews.toLocaleString()} ratings`;
document.getElementById("productPrice").textContent =
    product.price.toLocaleString();
document.getElementById("buyBoxPrice").textContent =
    product.price.toLocaleString();
document.getElementById("mrpPrice").textContent =
    `$${product.mrp.toLocaleString()}.00`;
document.getElementById("discountText").textContent =
    `You Save: $${(product.mrp - product.price).toLocaleString()}.00 (${product.discount}%)`;
document.getElementById("stockStatus").textContent =
    product.stock ? "In Stock" : "Out of Stock";
// ============================
// FEATURES
// ============================
const aboutList = document.getElementById("aboutList");
product.features.forEach(feature => {
    const li = document.createElement("li");
    li.textContent = feature;
    aboutList.appendChild(li);
});
// ============================
// THUMBNAILS
// ============================
const thumbnailContainer =
    document.getElementById("thumbnailContainer");
product.images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.className = "thumb";
    if (index === 0) {
        img.classList.add("active");
    }
    thumbnailContainer.appendChild(img);
});
// ============================
// MAIN IMAGE
// ============================
const mainImage =
document.getElementById("mainImage");

mainImage.src = product.images[0];
mainImage.alt = product.name;
// ============================
// GALLERY
// ============================
const thumbnails = document.querySelectorAll(".thumb");
thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
        thumbnails.forEach(img => {
            img.classList.remove("active");
        });
        thumb.classList.add("active");
        mainImage.style.opacity = "0";
        setTimeout(() => {
            mainImage.src = thumb.src;
            mainImage.style.opacity = "1";
        }, 150);
    });
});
const relatedSlider =
    document.getElementById("relatedSlider");
relatedProducts.forEach(item => {

    relatedSlider.innerHTML += `
    <a href="product.html?id=${item.id}" class="related-card">

        <img src="${item.images[0]}">

        <div class="related-title">
            ${item.name}
        </div>

        <div class="related-price">
            $${item.price}
        </div>

    </a>
    `;

});
// ============================
// RELATED PRODUCTS SLIDER
// ============================
const productSliders = document.querySelectorAll(".product-slider");
productSliders.forEach((sliderSection) => {
    const slider = sliderSection.querySelector(".slider-track");
    const leftBtn = sliderSection.querySelector(".slider-left");
    const rightBtn = sliderSection.querySelector(".slider-right");
    rightBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: 500,
            behavior: "smooth"
        });
    });
    leftBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: -500,
            behavior: "smooth"
        });
    });
});

const reviewsContainer = document.getElementById("reviewsContainer");
reviews.forEach(review => {
    reviewsContainer.innerHTML += `
<div class="review-card">
<div class="review-user">
${review.name}
</div>
<div class="review-stars">
${review.rating}
</div>
<div class="review-title">
${review.title}
</div>
<div class="review-text">
${review.text}
</div>
<div class="review-footer">
<span>Helpful</span>
<span>Report</span>
<span>Verified Purchase</span>
</div>
</div>
`;
});

// ============================
// BACK TO TOP
// ============================

const backToTop =
document.querySelector(".back-to-top");

if(backToTop){

    backToTop.addEventListener("click",()=>{

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}
// ============================
// CART SYSTEM
// ============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.forEach(item => {

    if (!item.quantity) {

        item.quantity = 1;

    }

});
function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}
function addToCart() {

    const quantity =
        Number(
            document.getElementById("buyQty").value
        );

    const existingProduct =
        cart.find(item => item.id === product.id);

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            ...product,

            quantity: quantity

        });

    }

    saveCart();

// Update the shared cart data used by common.js
window.location.reload();

}
document
    .getElementById("addToCartBtn")
    .addEventListener(
        "click",
        addToCart
    );
updateCartCount();
