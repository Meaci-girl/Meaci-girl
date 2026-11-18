
const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeButton");

const menuLinks = document.querySelectorAll(".menu-navigation a");

// ABRIR MENÚ
function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    menuButton.classList.add("active");

    document.body.style.overflow = "hidden";
}

// CERRAR MENÚ
function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    menuButton.classList.remove("active");

    document.body.style.overflow = "";
}

// BOTÓN PRINCIPAL
menuButton.addEventListener("click", () => {
    if (sidebar.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// BOTÓN X
closeButton.addEventListener("click", closeMenu);

// CERRAR AL PRESIONAR EL FONDO
overlay.addEventListener("click", closeMenu);

// CERRAR AL SELECCIONAR UNA OPCIÓN
menuLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// CERRAR CON ESCAPE
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

