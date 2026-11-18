
const tracks = [
  {
    title: "Igual Que Un Ángel",
    artist: "KALI UCHIS",
    cover: "imagenes/un-angel.jpg",
    audio: "audios/kali-angel.mpeg"
  },
  {
    title: "Telepatía",
    artist: "KALI UCHIS",
    cover: "imagenes/telepatia.jpg",
    audio: "audios/kali-telepatia.mpeg"
  },
  {
    title: "Moonlight",
    artist: "KALI UCHIS",
    cover: "imagenes/moo.jpg",
    audio: "audios/kali-moo.mpeg"
  },
 
];

const audio = document.getElementById("audio");
const cards = [...document.querySelectorAll(".song-card")];

const playPause = document.getElementById("playPause");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

let currentTrack = 2;
let isSeeking = false;

// Convierte los segundos a minutos
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
}

// Acomoda las portadas del carrusel
function arrangeCards() {
  cards.forEach((card, index) => {
    const difference = index - currentTrack;

    card.classList.toggle("active-card", difference === 0);
    card.classList.toggle("side-card", difference !== 0);

    card.dataset.position =
      Math.abs(difference) > 2 ? "hidden" : String(difference);

    card.setAttribute(
      "aria-pressed",
      difference === 0 ? "true" : "false"
    );
  });
}

// Carga la canción seleccionada
function loadTrack(index, autoplay = false) {
  currentTrack = (index + tracks.length) % tracks.length;

  const track = tracks[currentTrack];

  audio.src = track.audio;

  document.getElementById("trackTitle").textContent = track.title;
  document.getElementById("trackArtist").textContent = track.artist;

  document.getElementById("miniCover").src = track.cover;
  document.getElementById("miniCover").alt =
    `Portada de ${track.title}`;

  progress.value = 0;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";

  arrangeCards();

  if (autoplay) {
    playAudio();
  } else {
    playPause.textContent = "▶";
  }
}

// Reproduce la canción
async function playAudio() {
  try {
    await audio.play();

    playPause.textContent = "Ⅱ";
    playPause.setAttribute("aria-label", "Pausar");
  } catch (error) {
    playPause.textContent = "▶";

    console.warn(
      "No se pudo reproducir el audio. Revisa tu conexión o el enlace MP3.",
      error
    );
  }
}

// Al hacer clic en una portada
cards.forEach(card => {
  card.addEventListener("click", () => {
    loadTrack(Number(card.dataset.track), true);
  });
});

// Canción anterior
document.getElementById("prevTrack").addEventListener("click", () => {
  loadTrack(currentTrack - 1, true);
});

// Canción siguiente
document.getElementById("nextTrack").addEventListener("click", () => {
  loadTrack(currentTrack + 1, true);
});

// Mover el carrusel hacia la izquierda
document.getElementById("prevCards").addEventListener("click", () => {
  loadTrack(currentTrack - 1, false);
});

// Mover el carrusel hacia la derecha
document.getElementById("nextCards").addEventListener("click", () => {
  loadTrack(currentTrack + 1, false);
});

// Reproducir o pausar
playPause.addEventListener("click", () => {
  if (audio.paused) {
    playAudio();
  } else {
    audio.pause();
  }
});

// Cambia el icono cuando comienza o se detiene el audio
audio.addEventListener("play", () => {
  playPause.textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
  playPause.textContent = "▶";
});

// Muestra la duración de la canción
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

// Actualiza la barra de progreso
audio.addEventListener("timeupdate", () => {
  if (!isSeeking && Number.isFinite(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }

  currentTime.textContent = formatTime(audio.currentTime);
});

// Permite avanzar o retroceder dentro de la canción
progress.addEventListener("input", () => {
  isSeeking = true;
});

progress.addEventListener("change", () => {
  if (Number.isFinite(audio.duration)) {
    audio.currentTime =
      (Number(progress.value) / 100) * audio.duration;
  }

  isSeeking = false;
});

// Control de volumen
document.getElementById("volume").addEventListener("input", event => {
  audio.volume = Number(event.target.value);
});

// Al terminar una canción, reproduce la siguiente
audio.addEventListener("ended", () => {
  loadTrack(currentTrack + 1, true);
});

// Volumen inicial
audio.volume = 0.75;

// Canción que aparece al abrir la página
loadTrack(currentTrack);

const btnMenuReal = document.getElementById('btnMenuReal');
const menuDespegable = document.getElementById('menuDespegable');
const fondoOscuro = document.getElementById('fondoOscuro');

// Abrir
btnMenuReal.addEventListener('click', (e) => {
  e.stopPropagation();
  menuDespegable.classList.add('activo');
  fondoOscuro.classList.add('activo');
});

// Cerrar cuando le das click a lo oscuro o a cualquier parte de la página
fondoOscuro.addEventListener('click', () => {
  menuDespegable.classList.remove('activo');
  fondoOscuro.classList.remove('activo');
});