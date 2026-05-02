const imagenPrincipal = document.getElementById('imagen-principal');
const miniaturas = document.querySelectorAll('.galeria-thumb');
const imagenModal = document.getElementById('imagen-modal');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let indiceActual = 0;

// Cambiar imagen principal al hacer clic en miniatura
miniaturas.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        indiceActual = index;
        actualizarImagenes();
    });
});

// Al abrir el modal desde la imagen principal
imagenPrincipal.addEventListener('click', () => {
    // Buscar qué miniatura coincide con la imagen principal
    miniaturas.forEach((thumb, index) => {
        if (thumb.src === imagenPrincipal.src) {
            indiceActual = index;
        }
    });
    imagenModal.src = imagenPrincipal.src;
    imagenModal.alt = imagenPrincipal.alt;
});

// Botón anterior
prevBtn.addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + miniaturas.length) % miniaturas.length;
    actualizarImagenes();
});

// Botón siguiente
nextBtn.addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % miniaturas.length;
    actualizarImagenes();
});

// Función para actualizar imagen principal y modal
function actualizarImagenes() {
    const thumb = miniaturas[indiceActual];
    imagenPrincipal.src = thumb.src;
    imagenPrincipal.alt = thumb.alt;
    imagenModal.src = thumb.src;
    imagenModal.alt = thumb.alt;
}