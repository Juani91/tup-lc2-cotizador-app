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
    apiCompartir()
}

// Función para formatear la fecha
function formatearFecha(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear() % 100).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

let filtro = document.getElementById('filtro');
filtro.addEventListener("click", () => {
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
                label: `${moneda} - Compra`,
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

function compartirInfo() {
    
    const botonCompartirInfo = document.getElementById('compartirEmail');
    const ventanaCompartir = document.getElementById('ventana-compartir');
    const botonCerrarFormulario = document.getElementById('boton-cerrar');
    
    botonCompartirInfo.addEventListener('click', () => {
        ventanaCompartir.classList = ('ventana-compartir-active');
    });

    botonCerrarFormulario.addEventListener('click', () => {
        ventanaCompartir.classList = ('ventana-compartir');
    });
}

compartirInfo();


// function Alerta(msj, tipo) {
//     const contenedorAlerta = document.getElementById('contenedor-alerta');
//     const alerta = document.createElement('div');
//     alerta.className = `alerta alerta-${tipo}`;
//     alerta.textContent = msj;

//     contenedorAlerta.appendChild(alerta);
//     setTimeout(() => {
//         contenedorAlerta.removeChild(alerta);
//     }, 5000);
// }

/*function compartirInfo() {

    compartirInformacion = document.getElementById('CompartirEmail');

    compartirInformacion.addEventListener("click", () => {

        const formulario = document.createElement('div');

        const titulo = document.createElement('h2');
        titulo.textContent = 'DATOS DEL DESTINATARIO';

        const labelNombre = document.createElement('label');
        labelNombre.textContent = 'Nombre:';
        const indexNombre = document.createElement('input');

        const labelEmail = documento.createElement('label');
        labelEmail.textContent = 'Email:';
        const indexEmail = document.createElement('input');

        const botonCancelar = document.createElement('button');
        botonCancelar.textContent = 'Cancelar';
        const botonEnviar = document.createElement('button');
        botonEnviar.textContent = 'Enviar';

        formulario.appendChild(titulo);
        formulario.appendChild(labelNombre);
        formulario.appendChild(indexNombre);
        formulario.appendChild(labelEmail);
        formulario.appendChild(indexEmail);
        formulario.appendChild(botonCancelar);
        formulario.appendChild(botonEnviar);

        compartirInformacion.appendChild(formulario);

    })

    var tabla = {
        name: 'James',
        notes: 'Check this out!',
    };

    emailjs.send('formulario', 'template_dag5nc4', tabla).then(
        (response) => {
            console.log('Tabla enviada con éxito', response.status, response.text);
        },
        (error) => {
            console.log('ERROR. No se pudo enviar la tabla', error);
        },
    );
}*/

function apiCompartir() {

    divisor = document.getElementById('contenedor-formulario');
    compartirInformacion = document.getElementById('compartirEmail');
    compartirInformacion.addEventListener("click", () => {

        const contenedorInformes = document.getElementById('contenedor-alerta');
        contenedorInformes.className = ('cuadro-informes');
        const tabla = document.createElement('table');

        const fila1 = document.createElement('tr');
        const renglon1fila1 = document.createElement('td');
        const renglon2fila1 = document.createElement('td');

        const fila2 = document.createElement('tr');
        const renglon1fila2 = document.createElement('td');
        const renglon2fila2 = document.createElement('td');

        const etiqueta1 = document.createElement('label');
        etiqueta1.textContent = 'Nombre:';
        const nombreFormulario = document.createElement('input');
        nombreFormulario.type = 'text';
        nombreFormulario.id = 'nombreFormulario'

        const etiqueta2 = document.createElement('label');
        etiqueta2.textContent = 'Email:';


        const emailFormulario = document.createElement('input');
        emailFormulario.id = 'emailFormulario';
        emailFormulario.type = 'email';

        renglon1fila1.appendChild(etiqueta1);
        renglon2fila1.appendChild(nombreFormulario);
        fila1.appendChild(renglon1fila1);
        fila1.appendChild(renglon2fila1)
        tabla.appendChild(fila1);

        renglon1fila2.appendChild(etiqueta2);
        renglon2fila2.appendChild(emailFormulario);
        fila2.appendChild(renglon1fila2);
        fila2.appendChild(renglon2fila2);
        tabla.appendChild(fila2);

        contenedorInformes.appendChild(tabla);

        // Agregar contenedorInformes al divisor
        divisor.appendChild(contenedorInformes);

        // Envío del email
        function compartirFormulario() {
            const nombreAPI = nombreFormulario.value;
            const emailAPI = emailFormulario.value;
            const valoresAPI = {
                nombre: nombreAPI,
                email: emailAPI,
            };
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', valoresAPI).then(
                (response) => {
                    console.log('Email enviado con éxito!', response.status, response.text);
                },
                (error) => {
                    console.log('ERROR. No se pudo enviar el mail', error);
                }
            );
        }
        divisor.appendChild(contenedorInformes);
        compartirFormulario();
    });
        }
generarTabla();
tablaContenido();
