export async function getProductos() {
    try {
        const response = await fetch('http://localhost:3000/productos');
        if (!response.ok) {
            throw new Error('No se pudieron obtener los productos');
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

export async function crearProducto(producto) {
    try {
        const response = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });
        if (!response.ok) {
            throw new Error('No se pudo agregar el producto');
        }
        return true;
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        return false;
    }
}

export async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto');
        }
        return true;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return false;
    }
}
