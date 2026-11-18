
const gallery = document.getElementById("gallery");

const numberText = document.getElementById("photoNumber");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// AQUÍ COLOCAS LOS NOMBRES DE TUS 10 FOTOGRAFÍAS
const photos = [
    "latin/latin1.jpeg",
    "latin/latin2.jpeg",
    "latin/latin3.jpeg",
    "latin/latin4.jpeg",
    "latin/latin5.jpeg",
    "latin/latin6.jpeg",
    "latin/latin7.jpeg",
    "latin/latin8.jpeg",
    "latin/latin9.jpeg",
    "latin/latin10.jpeg",
];

let currentIndex = 0;
let cards = [];

// CREAR LAS 10 TARJETAS
photos.forEach((photo, index) => {

    const card = document.createElement("div");
    card.className = "photo-card";

    const img = document.createElement("img");
    img.src = photo;
    img.alt = "Fotografía " + (index + 1);
    img.draggable = false;

    card.appendChild(img);
    gallery.appendChild(card);

    cards.push(card);

    card.addEventListener("click", () => {

        let difference = index - currentIndex;

        // Encontrar el recorrido más corto
        if (difference > photos.length / 2) {
            difference -= photos.length;
        }

        if (difference < -photos.length / 2) {
            difference += photos.length;
        }

        if (difference !== 0) {
            currentIndex = index;
            updateGallery();
        }

    });

});

// ACTUALIZAR POSICIONES
function updateGallery() {

    cards.forEach((card, index) => {

        let difference = index - currentIndex;

        // Efecto circular de las 10 fotografías
        if (difference > photos.length / 2) {
            difference -= photos.length;
        }

        if (difference < -photos.length / 2) {
            difference += photos.length;
        }

        card.className = "photo-card";

        if (Math.abs(difference) <= 2) {

            if (difference === 0) {
                card.classList.add("pos-0");
            }

            else if (difference < 0) {
                card.classList.add("pos-" + Math.abs(difference));
            }

            else {
                card.classList.add("pos--" + difference);
            }

        } else {

            card.classList.add("hidden");

        }

    });

    // ACTUALIZAR NÚMEROS
    const number = String(currentIndex + 1).padStart(2, "0");

    numberText.textContent = number;
    progressText.textContent = number + " / 10";

    // ACTUALIZAR BARRA
    progressFill.style.width =
        ((currentIndex + 1) / photos.length * 100) + "%";

}

// SIGUIENTE FOTOGRAFÍA
function nextPhoto() {

    currentIndex++;

    if (currentIndex >= photos.length) {
        currentIndex = 0;
    }

    updateGallery();
}

// FOTOGRAFÍA ANTERIOR
function previousPhoto() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = photos.length - 1;
    }

    updateGallery();
}

// BOTONES
nextBtn.addEventListener("click", nextPhoto);
prevBtn.addEventListener("click", previousPhoto);

// TECLADO
document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        nextPhoto();
    }

    if (event.key === "ArrowLeft") {
        previousPhoto();
    }

});

// MOVIMIENTO CON EL DEDO O MOUSE
let startX = 0;
let startY = 0;

gallery.addEventListener("pointerdown", (event) => {

    startX = event.clientX;
    startY = event.clientY;

});

gallery.addEventListener("pointerup", (event) => {

    const differenceX = event.clientX - startX;
    const differenceY = event.clientY - startY;

    if (Math.abs(differenceX) > 45) {

        if (differenceX < 0) {
            nextPhoto();
        } else {
            previousPhoto();
        }

    } else if (Math.abs(differenceY) > 45) {

        if (differenceY < 0) {
            nextPhoto();
        } else {
            previousPhoto();
        }

    }

});

// INICIAR GALERÍA
updateGallery();

const btn = document.getElementById("btnMenuReal");
const menu = document.getElementById("menuDespegable");
const fondo = document.getElementById("fondoOscuro");
const cerrar = document.getElementById("cerrarMenu");

btn.addEventListener("click", () => {
  menu.classList.add("activo");
  fondo.classList.add("activo");
});

function cerrarMenu(){
  menu.classList.remove("activo");
  fondo.classList.remove("activo");
}

cerrar.addEventListener("click", cerrarMenu);
fondo.addEventListener("click", cerrarMenu);