
/* INFORMACION DE LOS CINCO VIDEOS */

const videos = [
    {
        archivo: "videos/video-bienhecho.mp4",
        portada: "imagenes/portada1.jpg",
        titulo: "HUMBE-BIEN HECHO",
        descripcion: "Una historia especial para comenzar."
    },

    {
        archivo: "videos/video-melancolia.mp4",
        portada: "imagenes/portada2.jpg",
        titulo: "MON LAFERTE-MELANCOLÍA",
        descripcion: "Descubre esta nueva experiencia."
    },

    {
        archivo: "videos/video-niño.mp4",
        portada: "imagenes/portada3.jpg",
        titulo: "MILO J-NIÑO",
        descripcion: "Un momento que vale la pena recordar."
    },

    {
        archivo: "videos/video-telepatia.mp4",
        portada: "imagenes/portada4.jpg",
        titulo: "KALI UCHIS-TELEPATÍA",
        descripcion: "Disfruta de esta nueva historia."
    },

    {
        archivo: "videos/video-nodigasnada.mp4",
        portada: "imagenes/portada5.jpg",
        titulo: "LATIN MAFIA- NO DIGAS NADA",
        descripcion: "Gracias por visitar MEACI."
    }
];


/* ELEMENTOS DEL HTML */

const mainVideo = document.getElementById("mainVideo");
const videoTitle = document.getElementById("videoTitle");
const videoDescription = document.getElementById("videoDescription");
const videoCounter = document.getElementById("videoCounter");
const placeholder = document.getElementById("placeholder");

const cards = document.querySelectorAll(".video-card");

let currentVideo = 0;


/* FUNCION PARA CAMBIAR EL VIDEO */

function selectVideo(index) {

    const selected = videos[index];

    currentVideo = index;

    // Cambiar archivo de video
    mainVideo.pause();
    mainVideo.src = selected.archivo;
    mainVideo.poster = selected.portada;
    mainVideo.load();

    // Cambiar titulo y descripcion
    videoTitle.textContent = selected.titulo;
    videoDescription.textContent = selected.descripcion;

    // Actualizar contador
    videoCounter.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(videos.length).padStart(2, "0");

    // Ocultar mensaje inicial
    placeholder.style.display = "none";

    // Marcar tarjeta seleccionada
    cards.forEach((card, i) => {
        card.classList.toggle("selected", i === index);
    });

    // Reproducir dentro del reproductor derecho
    mainVideo.play().catch(() => {
        // Si el navegador bloquea la reproducción automática,
        // se puede iniciar con el botón del reproductor.
    });
}


/* CLIC EN LOS CINCO CUADRITOS */

cards.forEach(card => {

    card.addEventListener("click", () => {

        const index = Number(card.dataset.index);

        selectVideo(index);

    });

});


/* MENU LATERAL DESPLEGABLE */

const sidebar = document.getElementById("sidebar");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");


function showMenu() {

    sidebar.classList.add("open");
    menuOverlay.classList.add("show");

}


function hideMenu() {

    sidebar.classList.remove("open");
    menuOverlay.classList.remove("show");

}


openMenu.addEventListener("click", showMenu);

closeMenu.addEventListener("click", hideMenu);

menuOverlay.addEventListener("click", hideMenu);


/* CERRAR MENU AL SELECCIONAR UNA OPCION */

document.querySelectorAll(".menu-link").forEach(link => {

    link.addEventListener("click", hideMenu);

});


/* PERMITIR CERRAR EL MENU CON ESCAPE */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        hideMenu();
    }

});


/* PREPARAR EL PRIMER VIDEO SIN REPRODUCIRLO */

mainVideo.src = videos[0].archivo;
mainVideo.poster = videos[0].portada;
