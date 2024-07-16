
const Favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
const tablaInforme = document.getElementById('tablaInforme');

// Función para generar la tabla con los datos de Favoritos
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

        // Primera fila con el nombre del favorito
        const fila = document.createElement('tr');
        const filaNombre = document.createElement('td');
        filaNombre.colSpan = 5;
        filaNombre.classList.add('moneda');
        filaNombre.textContent = nombre;
        fila.appendChild(filaNombre);
        tablaInforme.appendChild(fila);

        // Variable para almacenar el precio de venta del día anterior
        let precioVentaPrevio = null;

        // Array temporal para almacenar las filas de detalle
        const filasDetalles = [];

        // Filas con los detalles de compra y venta
        favoritos.forEach(favorito => {
            const filaDetalle = document.createElement('tr');

            const celdaVacia = document.createElement('td');

            const celdaFecha = document.createElement('td');
            celdaFecha.textContent = formatearFecha(favorito.fechaActualizacion);

            const celdaCompra = document.createElement('td');
            celdaCompra.textContent = `$${favorito.compra}`;

            const celdaVenta = document.createElement('td');
            celdaVenta.textContent = `$${favorito.venta}`;

            const iconoFlecha = document.createElement('td');
            if (precioVentaPrevio !== null) {
                if (favorito.venta > precioVentaPrevio) {
                    iconoFlecha.innerHTML = '<i class="fa-solid fa-circle-arrow-up"></i>';
                } else if (favorito.venta < precioVentaPrevio) {
                    iconoFlecha.innerHTML = '<i class="fa-solid fa-circle-arrow-down"></i>';
                }
            }
            precioVentaPrevio = favorito.venta;

            filaDetalle.appendChild(celdaVacia);
            filaDetalle.appendChild(celdaFecha);
            filaDetalle.appendChild(celdaCompra);
            filaDetalle.appendChild(celdaVenta);
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


//prueba


let filtro = document.getElementById('filtro');
filtro.addEventListener("click", () => {

    let selectorMonedas = document.getElementById('monedaSelect');

    let listaMonedasIguales = []
    let listaFechas = []
    let listaValoresCompra = []
    let listaValoresVenta = []

    if (selectorMonedas.value != "TODAS") {
        Favoritos.forEach((elemento) => {
            if (selectorMonedas.value == elemento.nombre) {
                listaMonedasIguales.push(elemento)
            };
        });
        listaMonedasIguales.forEach((elemento) => {
            fechaFormateada = formatearFecha(elemento.fechaActualizacion)
            if (fechaFormateada in listaMonedasIguales) {
            } else { listaFechas.push(fechaFormateada) };
        });

        listaMonedasIguales.forEach((elemento) => {
            if (elemento.compra in listaMonedasIguales) {
            } else { listaValoresCompra.push(elemento.compra) };
        });

        listaMonedasIguales.forEach((elemento) => {
            if (elemento.venta in listaMonedasIguales) {
            } else { listaValoresVenta.push(elemento.venta) };
        });

    } else {
        Favoritos.forEach((elemento) => {
            fechaFormateada = formatearFecha(elemento.fechaActualizacion)
            if (fechaFormateada in listaFechas) {
            } else { listaFechas.push(fechaFormateada) };
        });
    }



    const ctx = document.getElementById("miGrafica").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: listaFechas,
            datasets: [{
                label: "Compra",
                data: listaValoresCompra,
                borderColor: "blue",
                fill: false
            },
            {
                label: "Venta",
                data: listaValoresVenta,
                borderColor: "red",
                fill: false
            }]
        }
    });
})

// Llamar a la función para generar la tabla al cargar la página
generarTabla();