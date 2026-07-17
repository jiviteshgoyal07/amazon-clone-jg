// ===============================
// HERO SLIDER
// ===============================

const heroSlider = document.getElementById("hero-slider");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroLeft = document.getElementById("hero-left");
const heroRight = document.getElementById("hero-right");
let currentHero = 1;
const totalSlides = heroSlides.length;
function updateHero() {
    heroSlider.style.transform =
        `translateX(-${currentHero * 100}%)`;
}
function nextHero() {
    if (currentHero >= totalSlides - 1) return;
    currentHero++;
    updateHero();
}
function previousHero() {
    if (currentHero <= 0) return;
    currentHero--;
    updateHero();
}
// ---------- Auto Slider ----------
heroSlider.addEventListener("transitionend", () => {
    // If we reached the first clone
    if (heroSlides[currentHero].id === "first-clone") {

        heroSlider.style.transition = "none";

        currentHero = 1;

        updateHero();

        requestAnimationFrame(() => {
            heroSlider.style.transition = "transform .45s ease";
        });

    }

    // If we reached the last clone
    if (heroSlides[currentHero].id === "last-clone") {

        heroSlider.style.transition = "none";

        currentHero = totalSlides - 2;

        updateHero();

        requestAnimationFrame(() => {
            heroSlider.style.transition = "transform .45s ease";
        });

    }

});
let heroTimer;

function startHeroTimer() {
    heroTimer = setInterval(nextHero, 5000);
}

function resetHeroTimer() {
    clearInterval(heroTimer);
    startHeroTimer();
}

startHeroTimer();
updateHero();

// ---------- Arrow Buttons ----------

heroRight.addEventListener("click", () => {
    nextHero();
    resetHeroTimer();
});

heroLeft.addEventListener("click", () => {
    previousHero();
    resetHeroTimer();
});

// ===============================
// PRODUCT SLIDERS
// ===============================
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

// ============================
// RECENTLY VIEWED
// ============================

const recentlyViewed =
    getRecentlyViewed();

const recentlyViewedSlider =
    document.getElementById("recentlyViewedSlider");

if (
    recentlyViewedSlider &&
    recentlyViewed.length > 0
) {

    recentlyViewed.forEach(product => {

        recentlyViewedSlider.innerHTML += `

<a href="product.html?id=${product.id}" class="rv-card">

    <div class="rv-image">

        <img src="${product.images[0]}">

    </div>

    <div class="rv-title">

        ${product.name}

    </div>

    <div class="rv-rating">

        ⭐⭐⭐⭐⭐

        <span>${product.rating}</span>

        (${product.reviews.toLocaleString()})

    </div>

    <div class="rv-price">

        ${formatPrice(product.price)}

    </div>

    <div class="rv-prime">

        ✔ Prime

    </div>

</a>

`;

    });

} else if (recentlyViewedSlider) {

    recentlyViewedSlider.closest(".product-slider").style.display = "none";

}