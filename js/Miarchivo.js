
const Favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];

// Función para formatear la fecha (ejemplo: "15/04/24")
function formatearFecha(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear() % 100).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

// Función para mostrar los favoritos en la tabla.
function mostrarFavoritos() {
    // Obtenemos la referencia a la tabla donde se mostrarán los datos.
    const tabla = document.getElementById('tablaGeneral');
    
    // Usamos un Set para llevar el control de las fechas que ya se han agregado.
    const fechasAgregadas = new Set();

    // Iteramos sobre cada elemento en el array de favoritos.
    Favoritos.forEach((item, index) => {
        // Formateamos la fecha del item actual.
        const fechaFormateada = formatearFecha(item.fechaActualizacion);

        // Si la fecha formateada no ha sido agregada aún, la agregamos a la tabla.
        if (!fechasAgregadas.has(fechaFormateada)) {
            const filaFecha = document.createElement('tr');
            filaFecha.className = 'fila';

            const celdaFecha = document.createElement('td');
            celdaFecha.colSpan = 5;  // La celda de la fecha ocupará todas las columnas.
            celdaFecha.className = 'contenido-fecha';
            celdaFecha.textContent = fechaFormateada;

            filaFecha.appendChild(celdaFecha);
            tabla.appendChild(filaFecha);

            // Añadimos la fecha formateada al Set de fechas agregadas.
            fechasAgregadas.add(fechaFormateada);
        }

        // Creamos una nueva fila para el contenido de la moneda.
        const fila = document.createElement('tr');
        fila.className = 'fila contenido-moneda';

        const celdaMoneda = document.createElement('td');
        celdaMoneda.textContent = '';  // Esta celda está vacía.

        const celdaNombre = document.createElement('td');
        celdaNombre.className = 'columna-moneda';
        celdaNombre.textContent = item.nombre;  // Nombre de la moneda.

        const celdaCompra = document.createElement('td');
        celdaCompra.textContent = item.compra;  // Precio de compra.

        const celdaVenta = document.createElement('td');
        celdaVenta.textContent = item.venta;  // Precio de venta.

        // Creamos la celda para el ícono de borrar.
        const celdaBorrar = document.createElement('td');
        celdaBorrar.className = 'columna-borrar';
        const iconoBorrar = document.createElement('i');
        iconoBorrar.className = 'fa-solid fa-eraser';

        // Añadimos un evento de click al ícono de borrar.
        iconoBorrar.addEventListener('click', function () {
            // Eliminamos el item del array de favoritos.
            Favoritos.splice(index, 1);

            // Actualizamos el localStorage con el array modificado.
            localStorage.setItem('Favoritos', JSON.stringify(Favoritos));

            // Recargamos la página para reflejar los cambios en la tabla.
            location.reload();
        });

        celdaBorrar.appendChild(iconoBorrar);

        // Añadimos todas las celdas a la fila.
        fila.appendChild(celdaMoneda);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCompra);
        fila.appendChild(celdaVenta);
        fila.appendChild(celdaBorrar);

        // Añadimos la fila completa a la tabla.
        tabla.appendChild(fila);
    });
}

// Cuando el contenido del documento se ha cargado completamente, llamamos a la función para mostrar los favoritos.
document.addEventListener('DOMContentLoaded', function () {
    mostrarFavoritos();
});

// Imprimir el contenido de la página
const btnImpresora = document.querySelector('.icono-impresora');

function imprimirContenidoTabla() {
    const contenedorMiArchivo = document.querySelector('.contenedor-miarchivo');
    const impresion = contenedorMiArchivo.cloneNode(true);
    const ventanaImpresion = window.open('', 'Imprimir');
    ventanaImpresion.document.body.innerHTML = impresion.outerHTML;
    ventanaImpresion.print();
}

btnImpresora.addEventListener('click', imprimirContenidoTabla);