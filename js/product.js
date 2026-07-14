const thumbnails = document.querySelectorAll(".thumb");
const mainImage = document.getElementById("mainImage");

thumbnails.forEach((thumb) => {

    thumb.addEventListener("mouseenter", () => {

        mainImage.src = thumb.src;

        thumbnails.forEach((item) => {
            item.classList.remove("active");
        });

        thumb.classList.add("active");

    });

});