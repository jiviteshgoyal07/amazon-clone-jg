const products = [
    {
        id: 1,
        category: "Laptop",
        name: "Apple MacBook Air 13-inch Laptop with M4 chip, 16GB Unified Memory, 512GB SSD Storage, Sky Blue",
        price: 1299,
        mrp: 1499,
        discount: 13,
        rating: 4.8,
        reviews: 2834,
        stock: true,
        images: [
            "assets/products/macbook-air/macbook1.jpg",
            "assets/products/macbook-air/macbook2.jpg",
            "assets/products/macbook-air/macbook3.jpg",
            "assets/products/macbook-air/macbook4.jpg",
            "assets/products/macbook-air/macbook5.jpg",
            "assets/products/macbook-air/macbook6.jpg"
        ],
        features: [
            "Apple M4 chip delivers incredible performance.",
            "13.6-inch Liquid Retina display.",
            "16GB Unified Memory.",
            "512GB SSD Storage.",
            "Up to 18 hours battery life."
        ]
    },

    {
        id: 2,
        category: "Accessory",
        name: "Apple Magic Mouse",
        price: 79,
        mrp: 99,
        discount: 20,
        rating: 4.8,
        reviews: 1245,
        stock: true,
        images: [
            "assets/products/accessories/mouse.jpg"
        ],
        features: [
            "Wireless Bluetooth connectivity.",
            "Rechargeable battery.",
            "Multi-Touch surface.",
            "Optimized for macOS.",
            "Lightweight aluminium design."
        ]
    },

    {
        id: 3,
        category: "Accessory",
        name: "Apple Magic Keyboard",
        price: 99,
        mrp: 129,
        discount: 23,
        rating: 4.7,
        reviews: 1788,
        stock: true,
        images: [
            "assets/products/accessories/keyboard.jpg"
        ],
        features: [
            "Rechargeable battery.",
            "Bluetooth connectivity.",
            "Scissor mechanism keys.",
            "Slim aluminium body.",
            "Designed for Mac."
        ]
    },

    {
        id: 4,
        category: "Accessory",
        name: "USB-C Hub",
        price: 39,
        mrp: 49,
        discount: 20,
        rating: 4.5,
        reviews: 946,
        stock: true,
        images: [
            "assets/products/accessories/hub.jpg"
        ],
        features: [
            "HDMI Output.",
            "USB 3.0 ports.",
            "SD & microSD slots.",
            "Aluminium finish.",
            "Plug and Play."
        ]
    },

    {
        id: 5,
        category: "Accessory",
        name: "Apple AirPods Pro",
        price: 249,
        mrp: 279,
        discount: 11,
        rating: 4.9,
        reviews: 7854,
        stock: true,
        images: [
            "assets/products/accessories/airpods.jpg"
        ],
        features: [
            "Active Noise Cancellation.",
            "Transparency Mode.",
            "USB-C Charging.",
            "Spatial Audio.",
            "MagSafe Charging Case."
        ]
    },

    {
        id: 6,
        category: "Accessory",
        name: "Samsung Portable SSD",
        price: 129,
        mrp: 149,
        discount: 13,
        rating: 4.8,
        reviews: 4312,
        stock: true,
        images: [
            "assets/products/accessories/ssd.jpg"
        ],
        features: [
            "USB 3.2 Gen2.",
            "Up to 1050 MB/s.",
            "Shock Resistant.",
            "Password Protection.",
            "Compact Metal Design."
        ]
    },

    {
        id: 7,
        category: "Accessory",
        name: "LG UltraFine 4K Monitor",
        price: 699,
        mrp: 799,
        discount: 12,
        rating: 4.7,
        reviews: 1154,
        stock: true,
        images: [
            "assets/products/accessories/monitor.jpg"
        ],
        features: [
            "27-inch 4K IPS Display.",
            "USB-C Connectivity.",
            "HDR Support.",
            "99% sRGB.",
            "Ideal for Mac."
        ]
    }
];
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
const backToTop = document.querySelector(".back-to-top");
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
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
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}
function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}
function addToCart() {
    cart.push({ ...product });
    saveCart();
    updateCartCount();
}
document
    .getElementById("addToCartBtn")
    .addEventListener(
        "click",
        addToCart
    );
updateCartCount();
