
// ============================
// GET PRODUCT ID FROM URL
// ============================

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id")) || 1;
const product =
    getProductById(productId) || products[0];
    // ============================
// RECENTLY VIEWED
// ============================

let recentlyViewed =
    getRecentlyViewed();

// Remove the product if it's already present
recentlyViewed =
    recentlyViewed.filter(
        item => item.id !== product.id
    );

// Add current product to the beginning
recentlyViewed.unshift(product);

// Keep only the latest 8 products
recentlyViewed =
    recentlyViewed.slice(0, 8);

// Save to localStorage
saveRecentlyViewed(recentlyViewed);
const relatedProducts =
    getRelatedProducts(product.id);

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
    formatPrice(product.price);
document.getElementById("buyBoxPrice").textContent =
    formatPrice(product.price);
document.getElementById("mrpPrice").textContent =
    formatPrice(product.mrp);
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
// PRODUCT IMAGE ZOOM
// ============================

const zoomContainer =
    document.querySelector(".image-zoom-container");

zoomContainer.addEventListener("mousemove",(e)=>{

    const rect =
        zoomContainer.getBoundingClientRect();

    const x =
        ((e.clientX - rect.left) / rect.width) * 100;

    const y =
        ((e.clientY - rect.top) / rect.height) * 100;

    mainImage.style.transformOrigin =
        `${x}% ${y}%`;

    mainImage.style.transform =
        "scale(1.3)";

});

zoomContainer.addEventListener("mouseleave",()=>{

    mainImage.style.transform =
        "scale(1)";

    mainImage.style.transformOrigin =
        "center";

});
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
         ${formatPrice(item.price)}
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
// CART SYSTEM
// ============================
let cart = getCart();
cart.forEach(item => {

    if (!item.quantity) {

        item.quantity = 1;

    }

});
function saveCurrentCart() {

    saveCart(cart);

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

    saveCurrentCart();
    updateCartCount();

    showToast({
    type: "success",
    title: "Added to Cart",
    message: product.name,
    action: {
        text: "View Cart →",
        href: "cart.html"
    }
});

    // Update the shared cart data used by common.js
    updateCartCount();

}
document
    .getElementById("addToCartBtn")
    .addEventListener(
        "click",
        addToCart
    );
updateCartCount();
// ============================
// WISHLIST
// ============================

const wishlistBtn =
    document.getElementById("wishlistBtn");

let wishlist =
    getWishlist();

updateWishlistButton();

wishlistBtn.addEventListener(
    "click",
    toggleWishlist
);

function toggleWishlist(){

    const index =
        wishlist.findIndex(
            item => item.id === product.id
        );

    if(index > -1){

        wishlist.splice(index,1);

        showToast({
    type: "info",
    title: "Removed from Wishlist",
    message: product.name
});

    }else{

        wishlist.push(product);

        showToast({
    type: "success",
    title: "Added to Wishlist",
    message: product.name,
    action: {
        text: "View Wishlist →",
        href: "wishlist.html"
    }
});

    }

    saveWishlist(wishlist);

    updateWishlistCount();

    updateWishlistButton();

}

function updateWishlistButton(){

    const exists =
        wishlist.some(
            item => item.id === product.id
        );

    wishlistBtn.textContent =
        exists
        ? "❤️ Remove from Wishlist"
        : "♡ Add to Wishlist";

}