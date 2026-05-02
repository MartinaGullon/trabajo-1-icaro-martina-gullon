const botones = document.querySelectorAll('.add-to-cart');
const cartList = document.getElementById('cart-list');
const vaciarBtn = document.getElementById('vaciar-carrito');
const mensajeCarrito = document.getElementById('mensaje-carrito');
const navbarCartCount = document.getElementById('navbar-cart-count');

let total = 0;
let contador = 0;

let infoContainer = document.createElement('div');
infoContainer.classList.add('mt-3', 'text-center', 'fw-bold');
infoContainer.id = 'cart-info';
infoContainer.textContent = "Carrito vacío";
cartList.parentElement.insertBefore(infoContainer, vaciarBtn);

// --- Funciones auxiliares ---
function actualizarInfo() {
    infoContainer.textContent = contador > 0
        ? `Productos: ${contador} | Total: $${total.toLocaleString()}`
        : "Carrito vacío";
    navbarCartCount.textContent = contador; // actualiza el navbar
}

function mostrarMensaje(texto, tipo = "success") {
    mensajeCarrito.textContent = texto;
    mensajeCarrito.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3 text-center fade show`;
    mensajeCarrito.style.display = "block";

    setTimeout(() => {
        mensajeCarrito.classList.remove("show"); // fade out
        setTimeout(() => {
            mensajeCarrito.style.display = "none";
        }, 500);
    }, 2000);
}

function guardarCarrito() {
    const items = [];
    cartList.querySelectorAll('li').forEach(li => {
        const texto = li.querySelector('span').textContent;
        const precio = parseFloat(texto.split('$')[1].replace(/\./g, ''));
        items.push({ producto: texto.split(' - ')[0], precio });
    });
    localStorage.setItem('carrito', JSON.stringify({ items, total, contador }));
}

function cargarCarrito() {
    const data = JSON.parse(localStorage.getItem('carrito'));
    if (data) {
        total = data.total;
        contador = data.contador;
        data.items.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `
        <span>${item.producto} - $${item.precio.toLocaleString()}</span>
        <button class="btn btn-sm btn-danger remove-item">Eliminar</button>
      `;
            cartList.appendChild(li);

            li.querySelector('.remove-item').addEventListener('click', () => {
                li.remove();
                contador--;
                total -= item.precio;
                actualizarInfo();
                guardarCarrito();
                mostrarMensaje(`${item.producto} eliminado del carrito`, "warning");
            });
        });
        actualizarInfo();
    }
}

// --- Eventos ---
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.parentElement.querySelector('.card-title').textContent;
        const precio = parseFloat(boton.getAttribute('data-price'));

        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
      <span>${producto} - $${precio.toLocaleString()}</span>
      <button class="btn btn-sm btn-danger remove-item">Eliminar</button>
    `;
        cartList.appendChild(li);

        contador++;
        total += precio;
        actualizarInfo();
        guardarCarrito();
        mostrarMensaje(`${producto} agregado al carrito`, "success");

        li.querySelector('.remove-item').addEventListener('click', () => {
            li.remove();
            contador--;
            total -= precio;
            actualizarInfo();
            guardarCarrito();
            mostrarMensaje(`${producto} eliminado del carrito`, "warning");
        });
    });
});

vaciarBtn.addEventListener('click', () => {
    cartList.innerHTML = "";
    contador = 0;
    total = 0;
    actualizarInfo();
    localStorage.removeItem('carrito');
    mostrarMensaje("Carrito vaciado", "danger");
});

// --- Inicialización ---
cargarCarrito();