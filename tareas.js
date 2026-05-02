const inputTarea = document.getElementById('tarea-input');
const btnAgregar = document.getElementById('agregar-tarea');
const listaTareas = document.getElementById('lista-tareas');

// Cargar tareas desde localStorage
function cargarTareas() {
    const data = JSON.parse(localStorage.getItem('tareas')) || [];
    listaTareas.innerHTML = "";
    data.forEach(tarea => crearElementoTarea(tarea.texto, tarea.completada));
}

// Guardar tareas en localStorage
function guardarTareas() {
    const tareas = [];
    listaTareas.querySelectorAll('li').forEach(li => {
        tareas.push({
            texto: li.querySelector('span').textContent,
            completada: li.classList.contains('list-group-item-success')
        });
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Crear elemento de tarea
function crearElementoTarea(texto, completada = false) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (completada) li.classList.add('list-group-item-success');

    li.innerHTML = `
    <span>${texto}</span>
    <div>
      <button class="btn btn-sm btn-success me-2">✔</button>
      <button class="btn btn-sm btn-danger">✖</button>
    </div>
  `;

    // Marcar como completada
    li.querySelector('.btn-success').addEventListener('click', () => {
        li.classList.toggle('list-group-item-success');
        guardarTareas();
    });

    // Eliminar tarea
    li.querySelector('.btn-danger').addEventListener('click', () => {
        li.remove();
        guardarTareas();
    });

    listaTareas.appendChild(li);
}

// Evento agregar tarea
btnAgregar.addEventListener('click', () => {
    const texto = inputTarea.value.trim();
    if (texto !== "") {
        crearElementoTarea(texto);
        guardarTareas();
        inputTarea.value = "";
    }
});

// Enter también agrega tarea
inputTarea.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        btnAgregar.click();
    }
});

// Inicialización
cargarTareas();