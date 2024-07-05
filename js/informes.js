// Obtener datos del localStorage
const Favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];

// Obtener referencia al tbody donde se insertarán las filas
const tablaInforme = document.getElementById('tablaInforme');

// Función para generar la tabla con los datos de Favoritos
function generarTabla() {
    // Limpiar contenido previo de la tabla
    tablaInforme.innerHTML = '';

    // Iterar sobre los datos de Favoritos y crear las filas de la tabla
    Favoritos.forEach(favorito => {
        const row = document.createElement('tr');

        // Primera fila con el nombre del favorito
        const filaNombre = document.createElement('td');
        filaNombre.colSpan = 5;
        filaNombre.classList.add('moneda');
        filaNombre.textContent = favorito.nombre;
        row.appendChild(filaNombre);
        tablaInforme.appendChild(row);

        // Fila con los detalles de compra y venta
        const rowDetalle = document.createElement('tr');

        // Crear las celdas
        const emptyCell = document.createElement('td');

        const fechaCell = document.createElement('td');
        fechaCell.textContent = formatearFecha(favorito.fechaActualizacion);

        const compraCell = document.createElement('td');
        compraCell.textContent = `$${favorito.compra}`;

        const ventaCell = document.createElement('td');
        ventaCell.textContent = `$${favorito.venta}`;

        const iconCell = document.createElement('td');
        iconCell.innerHTML = renderArrow(favorito.compra, favorito.venta);

        // Agregar las celdas a la fila
        rowDetalle.appendChild(emptyCell);
        rowDetalle.appendChild(fechaCell);
        rowDetalle.appendChild(compraCell);
        rowDetalle.appendChild(ventaCell);
        rowDetalle.appendChild(iconCell);
        tablaInforme.appendChild(rowDetalle);
    });
}

// Función para formatear la fecha
function formatearFecha(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear() % 100).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

// Función para renderizar la flecha según la comparación entre compra y venta
function renderArrow(compra, venta) {
    if (venta > compra) {
        return '<i class="fa-solid fa-circle-arrow-up"></i>';
    } else if (venta < compra) {
        return '<i class="fa-solid fa-circle-arrow-down"></i>';
    } else {
        return '<i class="fa-solid fa-circle"></i>';
    }
}

// Llamar a la función para generar la tabla al cargar la página
generarTabla();