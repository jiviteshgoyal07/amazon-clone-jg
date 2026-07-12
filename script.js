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