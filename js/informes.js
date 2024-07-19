const Favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
const tablaInforme = document.getElementById('tablaInforme');
const colores = [
    'rgba(0, 0, 255, 0.6)',
    'rgba(173, 216, 230, 0.6)',
    'rgba(255, 0, 0, 0.6)',
    'rgba(240, 128, 128, 0.6)',
    'rgba(0, 128, 0, 0.6)',
    'rgba(144, 238, 144, 0.6)',
    'rgba(128, 0, 128, 0.6)',
    'rgba(218, 112, 214, 0.6)',
    'rgba(255, 165, 0, 0.6)',
    'rgba(244, 164, 96, 0.6)',
    'rgba(165, 42, 42, 0.6)',
    'rgba(222, 184, 135, 0.6)',
    'rgba(0, 0, 128, 0.6)',
    'rgba(135, 206, 235, 0.6)',
    'rgba(128, 0, 0, 0.6)',
    'rgba(250, 128, 114, 0.6)',
    'rgba(128, 128, 0, 0.6)',
    'rgba(154, 205, 50, 0.6)',
    'rgba(0, 128, 128, 0.6)',
    'rgba(0, 255, 255, 0.6)',
    'rgba(255, 0, 255, 0.6)',
    'rgba(221, 160, 221, 0.6)'
];


// Función para generar la tabla con los datos de Favoritos
function generarTabla() {
    tablaInforme.innerHTML = '';
    let monedaSelect = document.getElementById('monedaSelect')

    // Agrupar por nombre de moneda
    const listaFavoritos = Favoritos.reduce((datos, favorito) => {
        if (!datos[favorito.nombre]) {
            datos[favorito.nombre] = [];
        }
        datos[favorito.nombre].push(favorito);
        return datos;
    }, {});

    if (monedaSelect.value == 'TODAS') {
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
                    } else {
                        iconoFlecha.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
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
    } else {
        let favoritoFiltrado = monedaSelect.value;
        if (listaFavoritos[favoritoFiltrado].length > 0) {

            listaFavoritos[favoritoFiltrado].sort((a, b) => new Date(a.fechaActualizacion) - new Date(b.fechaActualizacion));
            const fila = document.createElement('tr');
            const filaNombre = document.createElement('td');
            filaNombre.colSpan = 5;
            filaNombre.classList.add('moneda');
            filaNombre.textContent = favoritoFiltrado;
            fila.appendChild(filaNombre);
            tablaInforme.appendChild(fila);

            let precioVentaPrevio = null;

            const filasDetalles = [];

            listaFavoritos[favoritoFiltrado].forEach(favorito => {
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
                    } else {
                        iconoFlecha.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
                    }
                }
                precioVentaPrevio = favorito.venta;

                filaDetalle.appendChild(celdaVacia);
                filaDetalle.appendChild(celdaFecha);
                filaDetalle.appendChild(celdaCompra);
                filaDetalle.appendChild(celdaVenta);
                filaDetalle.appendChild(iconoFlecha);

                filasDetalles.push(filaDetalle);
            });

            filasDetalles.reverse().forEach(filaDetalle => {
                tablaInforme.appendChild(filaDetalle);
            });
        }
    }
}


// Función para formatear la fecha
function formatearFecha(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear() % 100).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

function FechaSinHora(fecha) {
    let fechaFormateada = new Date(fecha).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return fechaFormateada
}

let filtro = document.getElementById('filtro');
filtro.addEventListener("click", () => {
    generarTabla();
    tablaContenido();
});


function tablaContenido() {
    let selectorMonedas = document.getElementById('monedaSelect').value;

    let listaFechas = [];
    let datasets = [];

    Favoritos.sort((a, b) => new Date(a.fechaActualizacion) - new Date(b.fechaActualizacion));

    if (selectorMonedas !== "TODAS") {
        let listaValoresCompra = [];
        let listaValoresVenta = [];
        Favoritos.forEach((elemento) => {
            if (selectorMonedas === elemento.nombre) {
                const fechaFormateada = formatearFecha(elemento.fechaActualizacion);
                if (!listaFechas.includes(fechaFormateada)) {
                    listaFechas.push(fechaFormateada);
                }
                listaValoresCompra.push(elemento.compra);
                listaValoresVenta.push(elemento.venta);
            }
        });

        datasets.push({
            label: `${selectorMonedas} - Compra`,
            data: listaValoresCompra,
            borderColor: colores[0],
            fill: false
        });

        datasets.push({
            label: `${selectorMonedas} - Venta`,
            data: listaValoresVenta,
            borderColor: colores[1],
            fill: false
        });
    } else {
        const monedaData = {};

        Favoritos.forEach((elemento) => {
            const fechaFormateada = formatearFecha(elemento.fechaActualizacion);
            if (!listaFechas.includes(fechaFormateada)) {
                listaFechas.push(fechaFormateada);
            }
            if (!monedaData[elemento.nombre]) {
                monedaData[elemento.nombre] = { compra: [] };
            }
            monedaData[elemento.nombre].compra.push(elemento.compra);
        });

        Object.keys(monedaData).forEach((moneda, index) => {
            const colorIndex = (index * 2);
            datasets.push({
                label: `${moneda}`,
                data: monedaData[moneda].compra,
                borderColor: colores[colorIndex],
                fill: false
            });
        });
    }
    
    crearGrafico(listaFechas, datasets);
}


function crearGrafico(listaFechas, datasets) {
    const ctx = document.getElementById("miGrafica").getContext("2d");
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: listaFechas,
            datasets: datasets
        },
    });
}


function compartirInformacion() {
    const botonCompartirInfo = document.getElementById('compartirEmail');
    const ventanaCompartir = document.getElementById('ventana-compartir');
    const botonCerrarFormulario = document.getElementById('boton-cerrar');
    const botonEnviar = document.getElementById('enviarTabla');

    botonCompartirInfo.addEventListener('click', () => {
        ventanaCompartir.classList.add('ventana-compartir-active');
    });

    botonEnviar.addEventListener('click', (event) => {
        event.preventDefault();
        let monedaSelect = document.getElementById('monedaSelect').value;
        let nombreFormulario = document.getElementById('nombre').value;
        let emailFormulario = document.getElementById('email').value;
        let graficoInfo = {};

        if (monedaSelect === 'TODAS') {
            Favoritos.forEach(monedaGuardada => {
                let monedaActual = monedaGuardada.nombre;
                if (!graficoInfo[monedaActual]) {
                    graficoInfo[monedaActual] = [];
                }

                Favoritos.forEach(monedaRecorrida => {
                    if (monedaActual === monedaRecorrida.nombre) {
                        let fechaFormateada = formatearFecha(monedaRecorrida.fechaActualizacion);

                        let entradaExiste = graficoInfo[monedaActual].some(item =>
                            item.fecha === fechaFormateada &&
                            item.compra === monedaRecorrida.compra &&
                            item.venta === monedaRecorrida.venta
                        );

                        if (!entradaExiste) {
                            graficoInfo[monedaActual].push({
                                fecha: fechaFormateada,
                                compra: monedaRecorrida.compra,
                                venta: monedaRecorrida.venta
                            });
                        }
                    }
                });
            });
        } else {
            graficoInfo[monedaSelect] = [];
            
            Favoritos.forEach(moneda => {
                if (moneda.nombre === monedaSelect) {
                    let fechaFormateada = formatearFecha(moneda.fechaActualizacion);
                    graficoInfo[monedaSelect].push({
                        fecha: fechaFormateada,
                        compra: moneda.compra,
                        venta: moneda.venta
                    });
                }
            })
        }

        function validarMail(emailFormulario) {
            emailValidado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailValidado.test(emailFormulario);
        }


        if (!validarMail(emailFormulario)) {
            Alerta('Por favor ingrese e-mail válido.', 'warning');
            return ;
        }

        let graficoString = JSON.stringify(graficoInfo, null, 2)
        console.log(graficoString);
        var formulario = {
            nombreForm: nombreFormulario,
            emailForm: emailFormulario,
            graficoForm: graficoString,
        };

        emailjs.send('service_ylsbds2', 'template_murvfzv', formulario, '-8cfnd3ntwRy27zP1')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                Alerta('¡Correo enviado con éxito!', 'success');
                limpiarCerrar();
            })
            .catch((error) => {
                console.log('FAILED...', error);
                Alerta('¡Error al enviar el correo! Por favor, inténtalo de nuevo más tarde.', 'error');
                limpiarCerrar();
            });

        botonCerrarFormulario.addEventListener('click', () => {
            limpiarCerrar();
        });

        function limpiarCerrar() {
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            ventanaCompartir.classList.remove('ventana-compartir-active');
        }
    })
};



compartirInformacion();
generarTabla();
tablaContenido();
