
const Favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
const tablaInforme = document.getElementById('tablaInforme');

function generarTabla() {

    tablaInforme.innerHTML = '';

    // Agrupar por nombre de moneda
    const listaFavoritos = Favoritos.reduce((datos, favorito) => {
        if (!datos[favorito.nombre]) {
            datos[favorito.nombre] = [];
        }
        datos[favorito.nombre].push(favorito);
        return datos;
    }, {});

    Object.keys(listaFavoritos).forEach(nombre => {
        
        const favoritos = listaFavoritos[nombre];

        // Ordenar las fechas de menor a mayor
        favoritos.sort((a, b) => new Date(a.fechaActualizacion) - new Date(b.fechaActualizacion));

        // Primera fila con el nombre
        const fila = document.createElement('tr');
        const filaNombre = document.createElement('td');
        filaNombre.colSpan = 5;
        filaNombre.classList.add('moneda');
        filaNombre.textContent = nombre;
        fila.appendChild(filaNombre);
        tablaInforme.appendChild(fila);

        // Variable para almacenar el precio de venta del día anterior
        let ventaPrevia = null;

        // Array temporal para almacenar las filas de detalle
        const filasDetalles = [];

        // Filas con los detalles de compra y venta
        favoritos.forEach(favorito => {
            const filaDetalle = document.createElement('tr');

            const filaVacia = document.createElement('td');

            const columnaFecha = document.createElement('td');
            columnaFecha.textContent = formatearFecha(favorito.fechaActualizacion);

            const columnaCompra = document.createElement('td');
            columnaCompra.textContent = `$${favorito.compra}`;

            const columnaVenta = document.createElement('td');
            columnaVenta.textContent = `$${favorito.venta}`;

            const iconoFlecha = document.createElement('td');

            if (ventaPrevia !== null) {
                if (favorito.venta > ventaPrevia) {
                    iconoFlecha.innerHTML = '<i class="fa-solid fa-circle-arfila-up"></i>';
                } else if (favorito.venta < ventaPrevia) {
                    iconoFlecha.innerHTML = '<i class="fa-solid fa-circle-arfila-down"></i>';
                }
            }

            ventaPrevia = favorito.venta;

            filaDetalle.appendChild(filaVacia);
            filaDetalle.appendChild(columnaFecha);
            filaDetalle.appendChild(columnaCompra);
            filaDetalle.appendChild(columnaVenta);
            filaDetalle.appendChild(iconoFlecha);

            // Añadir la fila de detalle al array temporal
            filasDetalles.push(filaDetalle);
        });

        // Añadir las filas de detalle en orden inverso para mostrar la fecha más reciente primero
        filasDetalles.reverse().forEach(filaDetalle => {
            tablaInforme.appendChild(filaDetalle);
        });
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

generarTabla();