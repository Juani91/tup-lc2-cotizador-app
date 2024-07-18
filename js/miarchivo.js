const fechasAgregadas = [];
const Favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];

// Función para formatear la fecha al formato tipo "15/04/24"
function formatearFecha(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear() % 100).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

function compararFechas(fecha1, fecha2) {
    return fecha1 === fecha2;
}

// Mostrar los favoritos en la tabla
function mostrarFavoritos() {

    if (Favoritos.length === 0) {
        Alerta('NO HAY COTIZACIONES GUARDADAS', 'error');
    }

    const tabla = document.getElementById('tablaGeneral');
    Favoritos.sort((a, b) => new Date(b.fechaActualizacion) - new Date(a.fechaActualizacion));
    Favoritos.forEach((item, index) => {
        // Formateamos la fecha del item actual.
        const fechaFormateada = formatearFecha(item.fechaActualizacion);

        let fechaExiste = false;
        for (let i = 0; i < fechasAgregadas.length; i++) {
            if (compararFechas(fechasAgregadas[i], fechaFormateada)) {
                fechaExiste = true;
                break;
            }
        }
        
        // Si la fecha no está agregada, la agregamos a la tabla
        if (!fechaExiste) {
            const filaFecha = document.createElement('tr');
            filaFecha.className = 'fila';

            const celdaFecha = document.createElement('td');
            celdaFecha.colSpan = 5;
            celdaFecha.className = 'contenido-fecha';
            celdaFecha.textContent = fechaFormateada;

            filaFecha.appendChild(celdaFecha);
            tabla.appendChild(filaFecha);

            fechasAgregadas.push(fechaFormateada); // Añadimos la fecha al array
        }

        const fila = document.createElement('tr');
        fila.className = 'fila contenido-moneda';

        const celdaMoneda = document.createElement('td');
        celdaMoneda.textContent = '';

        const celdaNombre = document.createElement('td');
        celdaNombre.className = 'columna-moneda';
        celdaNombre.textContent = item.nombre;

        const celdaCompra = document.createElement('td');
        celdaCompra.textContent = item.compra;

        const celdaVenta = document.createElement('td');
        celdaVenta.textContent = item.venta;

        const celdaBorrar = document.createElement('td');
        celdaBorrar.className = 'columna-borrar';
        const iconoBorrar = document.createElement('i');
        iconoBorrar.className = 'fa-solid fa-eraser';

        // Eliminamos el item, actualizamos el localStorage y recargamos la página
        iconoBorrar.addEventListener('click', function () {

            Favoritos.splice(index, 1);
            localStorage.setItem('Favoritos', JSON.stringify(Favoritos));
            location.reload();
        });

        celdaBorrar.appendChild(iconoBorrar);

        fila.appendChild(celdaMoneda);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCompra);
        fila.appendChild(celdaVenta);
        fila.appendChild(celdaBorrar);

        tabla.appendChild(fila);
    });
}


const btnImpresora = document.querySelector('.icono-impresora');

function imprimirContenidoTabla() {
    const contenedorMiArchivo = document.querySelector('.contenedor-miarchivo');
    const impresion = contenedorMiArchivo.cloneNode(true);
    const ventanaImpresion = window.open('', 'Imprimir');
    ventanaImpresion.document.body.innerHTML = impresion.outerHTML;
    ventanaImpresion.print();
}

mostrarFavoritos();
btnImpresora.addEventListener('click', imprimirContenidoTabla);