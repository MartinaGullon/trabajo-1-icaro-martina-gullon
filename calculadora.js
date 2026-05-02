const formCalculadora = document.getElementById('formCalculadora');
const inputPosicion = document.getElementById('posicion');
const resultado = document.getElementById('resultado');

// Tabla oficial de puntos F1
const puntosPorPosicion = {
    1: 25,
    2: 18,
    3: 15,
    4: 12,
    5: 10,
    6: 8,
    7: 6,
    8: 4,
    9: 2,
    10: 1
};

// Tabla de puntos para Sprint
const puntosSprint = {
    1: 8,
    2: 7,
    3: 6,
    4: 5,
    5: 4,
    6: 3,
    7: 2,
    8: 1
};

formCalculadora.addEventListener('submit', e => {
    e.preventDefault();
    const posicion = parseInt(inputPosicion.value);

    let mensaje = "";

    // Carrera principal
    if (puntosPorPosicion[posicion]) {
        mensaje += `🏁 Carrera: ${puntosPorPosicion[posicion]} puntos\n`;
    } else if (posicion >= 1 && posicion <= 20) {
        mensaje += "🏁 Carrera: No se asignan puntos\n";
    } else {
        mensaje = "Por favor ingresa una posición válida (1-20).";
        resultado.className = "mt-4 text-center fs-4 fw-bold text-warning";
        resultado.textContent = mensaje;
        return;
    }

    // Sprint
    if (puntosSprint[posicion]) {
        mensaje += `⚡ Sprint: ${puntosSprint[posicion]} puntos`;
    } else {
        mensaje += "⚡ Sprint: No se asignan puntos";
    }

    resultado.textContent = mensaje;
    resultado.className = "mt-4 text-center fs-4 fw-bold text-success";
});
