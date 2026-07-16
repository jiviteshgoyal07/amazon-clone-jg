// ==========================================
// LAYOUT.JS
// Loads shared Navbar and Footer
// ==========================================

async function loadComponent(id, file) {

    const element =
        document.getElementById(id);

    if (!element) return;

    const response =
        await fetch(file);

    element.innerHTML =
        await response.text();

}

// ===============================
// LOAD SHARED COMPONENTS
// ===============================

async function loadLayout() {

    await loadComponent(
        "navbar-container",
        "components/navbar.html"
    );

    await loadComponent(
        "footer-container",
        "components/footer.html"
    );

    // Navbar is now in the page
    updateCartCount();

    initializeBackToTop();

    initializeNavbar();

}

loadLayout();

