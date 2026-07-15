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
// ===============================
// PRODUCT DATABASE
// ===============================

window.products = products;