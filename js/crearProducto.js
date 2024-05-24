document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Función para renderizar los productos almacenados
    function renderProductos() {
        const productosContainer = document.getElementById('productos');
        productosContainer.innerHTML = ''; // Limpiar contenedor

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('card');

            const imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;

            const infoContainer = document.createElement('div');
            infoContainer.classList.add('card-container--info');

            const nombre = document.createElement('p');
            nombre.textContent = producto.nombre;

            const valueContainer = document.createElement('div');
            valueContainer.classList.add('card-container--value');

            const precio = document.createElement('p');
            precio.textContent = `$ ${producto.precio}`;

            const eliminarBtn = document.createElement('button');
            eliminarBtn.classList.add('eliminar-producto-btn');
            eliminarBtn.innerHTML = '<img src="imagenes/basura.png" alt="Eliminar">';

            eliminarBtn.addEventListener('click', () => {
                // Eliminar producto de la lista
                const index = productos.indexOf(producto);
                if (index !== -1) {
                    productos.splice(index, 1);
                    localStorage.setItem('productos', JSON.stringify(productos));
                    renderProductos(); // Volver a renderizar la lista de productos
                }
            });

            valueContainer.appendChild(precio);
            valueContainer.appendChild(eliminarBtn);

            infoContainer.appendChild(nombre);
            infoContainer.appendChild(valueContainer);

            card.appendChild(imagen);
            card.appendChild(infoContainer);

            productosContainer.appendChild(card);
        });
    }

    renderProductos(); // Renderizar los productos al cargar la página

    // Manejar el envío del formulario
    productForm.addEventListener('submit', event => {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Capturar los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const imagen = document.getElementById('imagen').value;

        // Crear objeto producto
        const producto = {
            nombre: nombre,
            precio: precio,
            imagen: imagen
        };

        // Agregar producto a la lista de productos
        productos.push(producto);

        // Almacenar lista de productos en el almacenamiento local
        localStorage.setItem('productos', JSON.stringify(productos));

        // Limpiar el formulario
        productForm.reset();

        // Renderizar los productos actualizados
        renderProductos();
    });
});
