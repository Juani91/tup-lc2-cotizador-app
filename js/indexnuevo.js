const botonFiltro = document.getElementById('boton-filtro');
const contenedorDatos = document.querySelector('.cotizaciones-container-index');
let selectorMonedas = document.getElementById('select-moneda-index');
const textoFecha = document.querySelector('.texto-datos-actualizados');

let arrayDolares = [];
let arrayCotizaciones = [];
let listaStringify = [];

let listaMonedas = [];
let cotizacionesSinDolar = ['eur', 'brl', 'clp', 'uyu']


// Comparar si dos objetos de monedas son iguales
function compararMonedas(moneda1, moneda2) {
    return moneda1.moneda === moneda2.moneda &&
        moneda1.casa === moneda2.casa &&
        moneda1.nombre === moneda2.nombre &&
        moneda1.compra === moneda2.compra &&
        moneda1.venta === moneda2.venta &&
        moneda1.fechaActualizacion === moneda2.fechaActualizacion;
}

function cambiarFechayHora() {

    // Mostrar la fecha actual al inicio
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    textoFecha.innerHTML = `Datos actualizados al ${formattedDate}`;

    // Actualizar la fecha cada 5 minutos
    setInterval(() => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
        textoFecha.innerHTML = `Datos actualizados al ${formattedDate}`;

        localStorage.setItem('listaMonedas', '');
        fetchDatos();
    }, 300000);

}

function fetchDatos() {
    const fetchDolares = fetch('https://dolarapi.com/v1/dolares')
        .then(response => response.json())
        .then(data => {
            arrayDolares = data.map(d => ({
                moneda: d.moneda,
                casa: d.casa,
                nombre: d.nombre,
                compra: d.compra,
                venta: d.venta,
                fechaActualizacion: d.fechaActualizacion,
            }));
            arrayDolares.forEach(elemento => listaMonedas.push(elemento));
        })
        .catch(error => {
            console.error('Error: ', error);
        });


    const fetchCotizaciones = cotizacionesSinDolar.map(moneda => {
        return fetch(`https://dolarapi.com/v1/cotizaciones/${moneda}`)
            .then(response => response.json())
            .then(data => {
                const objeto = {
                    moneda: data.moneda,
                    casa: data.casa,
                    nombre: data.nombre,
                    compra: data.compra,
                    venta: data.venta,
                    fechaActualizacion: data.fechaActualizacion,
                };
                listaMonedas.push(objeto);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    });

    // Esperar a que todas las solicitudes fetch se completen
    Promise.all([fetchDolares, ...fetchCotizaciones]).then(() => {
        console.log(listaMonedas);
        localStorage.setItem('listaMonedas', JSON.stringify(listaMonedas));
    });
}

fetchDatos();
cambiarFechayHora();


function cargarIndex(){

const contenedorGeneral = document.getElementById('contenedor-general');

var listaMonedasIndex = localStorage.getItem('listaMonedas');
var listaMonedasIndexJSON = JSON.parse(listaMonedasIndex);


contenedorGeneral.innerHTML = '';
listaMonedasIndexJSON.forEach(elementoLista => {
    const valorContainerIndex = document.createElement('div');
    valorContainerIndex.className = 'valor-container-index';

    const caracteresContainerIndex = document.createElement('div');
    caracteresContainerIndex.className = 'caracteres-container-index';

    const nombreContainer = document.createElement('div');
    const nombreContainerText = document.createElement('h3');
    nombreContainerText.textContent = elementoLista.nombre.toUpperCase();

    let compraContainter = document.createElement('div');
    const tituloCompraContainer = document.createElement('p');
    tituloCompraContainer.textContent = "COMPRA"
    let valorCompraContainer = document.createElement('h3');
    valorCompraContainer.textContent = `$${elementoLista.compra}`;

    let ventaContainer = document.createElement('div');
    const tituloVentaContainer = document.createElement('p');
    tituloVentaContainer.textContent = "VENTA"
    let valorVentaContainer = document.createElement('h3');
    valorVentaContainer.textContent = `$${elementoLista.venta}`;

    const iconoContainer =document.createElement ('div');
    const icono = document.createElement('i');
    icono.classname= 'favorito' ;
    iconoContainer.appendChild(icono)


    nombreContainer.appendChild(nombreContainerText)

    valorContainerIndex.appendChild(caracteresContainerIndex)


    caracteresContainerIndex.appendChild(nombreContainer)
    caracteresContainerIndex.appendChild(compraContainter)
    caracteresContainerIndex.appendChild(ventaContainer)
    caracteresContainerIndex.appendChild(iconoContainer)

    compraContainter.appendChild(tituloCompraContainer)
    compraContainter.appendChild(valorCompraContainer)

    ventaContainer.appendChild(tituloVentaContainer)
    ventaContainer.appendChild(valorVentaContainer)


    
    contenedorGeneral.appendChild(valorContainerIndex)
})
    
};
cargarIndex();