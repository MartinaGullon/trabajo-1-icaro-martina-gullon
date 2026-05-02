document.addEventListener("DOMContentLoaded", () => {
    const navbarCartCount = document.getElementById('navbar-cart-count');
    const navbarCartItems = document.getElementById('navbar-cart-items');
    const data = JSON.parse(localStorage.getItem('carrito'));

    if (data && data.contador > 0) {
        navbarCartCount.textContent = data.contador;

        // Mostrar productos en el dropdown
        let html = "";
        data.items.slice(0, 3).forEach(item => {
            html += `<div>${item.producto} - $${item.precio.toLocaleString()}</div>`;
        });

        // Si hay más de 3 productos, indicamos que hay más
        if (data.items.length > 3) {
            html += `<div class="text-muted">+${data.items.length - 3} más...</div>`;
        }

        // Mostrar total
        html += `<div class="fw-bold mt-2">Total: $${data.total.toLocaleString()}</div>`;
        navbarCartItems.innerHTML = html;
    } else {
        navbarCartCount.textContent = 0;
        navbarCartItems.textContent = "Carrito vacío";
    }
});