import { getProductos, eliminarProducto } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const contenedorProductos = document.querySelector('#productos');

    const productos = await getProductos();

    productos.forEach(producto => {
        const card = crearCardProducto(producto);
        contenedorProductos.appendChild(card);
    });
});

function crearCardProducto(producto) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const info = document.createElement('div');
    info.classList.add('card-container--info');

    const nombreProducto = document.createElement('p');
    nombreProducto.textContent = producto.nombre;

    const value = document.createElement('div');
    value.classList.add('card-container--value');

    const precioProducto = document.createElement('p');
    precioProducto.textContent = `$${producto.precio}`;

    const iconoEliminar = document.createElement('img');
    iconoEliminar.src = "./assets/trashIcon.png";
    iconoEliminar.alt = "Eliminar";
    iconoEliminar.addEventListener('click', async () => {
        const confirmarEliminar = confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmarEliminar) {
            const eliminado = await eliminarProducto(producto.id);
            if (eliminado) {
                // Recargar la lista de productos después de eliminar uno
                window.location.reload();
            } else {
                alert('Hubo un problema al eliminar el producto. Por favor inténtelo de nuevo.');
            }
        }
    });

    value.appendChild(precioProducto);
    value.appendChild(iconoEliminar);

    info.appendChild(nombreProducto);
    info.appendChild(value);

    card.appendChild(img);
    card.appendChild(info);

    return card;
}

