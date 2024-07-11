const botonFiltro = document.getElementById('boton-filtro');
const contenedorDatos = document.querySelector('.cotizaciones-container-index');
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
        moneda1.venta === moneda2.venta;
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
        cargarIndex();
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
            Alerta(`HUBO UN ERROR AL CARGAR LAS COTIZACIONES`, 'error');
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
                Alerta(`HUBO UN ERROR AL CARGAR LAS COTIZACIONES`, 'error');
            });
    });

    // Esperar a que todas las solicitudes fetch se completen
    Promise.all([fetchDolares, ...fetchCotizaciones]).then(() => {
        localStorage.setItem('listaMonedas', JSON.stringify(listaMonedas));
    });
}


function cargarIndex() {

    var listaMonedasIndex = localStorage.getItem('listaMonedas');
    var listaMonedasIndexJSON = JSON.parse(listaMonedasIndex);

    contenedorDatos.innerHTML = '';

    listaMonedasIndexJSON.forEach(item => {
        crearItem(item);
    })
};


function elegirMoneda() {
    contenedorDatos.innerHTML = '';
    let listaStringify = JSON.parse(localStorage.getItem("listaMonedas")) || [];
    let selectorMonedas = document.getElementById('select-moneda-index');
    if (selectorMonedas.value == 'TODAS') {
        cargarIndex();
    } else if (selectorMonedas.value == 'USD') {
        for (let i = 0; i < listaStringify.length; i++) {
            if (listaStringify[i].moneda === 'USD') {
                crearItem(listaStringify[i]);
            }
        }
    } else {
        for (let i = 0; i < listaStringify.length; i++) {
            if (listaStringify[i].moneda === selectorMonedas.value) {
                crearItem(listaStringify[i]);
                break;
            }
        }
    }
};

function crearItem(item) {

    const valorContainer = document.createElement('div');
    valorContainer.className = 'valor-container-index';

    const caracteresContainer = document.createElement('div');
    caracteresContainer.className = 'caracteres-container-index';

    const nombreElemento = document.createElement('h3');
    nombreElemento.textContent = item.nombre.toUpperCase();

    const compraElemento = document.createElement('div');
    const compraTexto = document.createElement('p');
    compraTexto.textContent = 'COMPRA';
    const compraValor = document.createElement('h3');
    compraValor.textContent = `$${item.compra}`;
    compraElemento.appendChild(compraTexto);
    compraElemento.appendChild(compraValor);

    const ventaElemento = document.createElement('div');
    const ventaTexto = document.createElement('p');
    ventaTexto.textContent = 'VENTA';
    const ventaValor = document.createElement('h3');
    ventaValor.textContent = `$${item.venta}`;
    ventaElemento.appendChild(ventaTexto);
    ventaElemento.appendChild(ventaValor);

    const estrella = document.createElement('i');
    estrella.className = 'fa-solid fa-star';

    let listaStringify = JSON.parse(localStorage.getItem("Favoritos")) || [];
    let encontrada = false;

    for (let i = 0; i < listaStringify.length; i++) {
        if (compararMonedas(listaStringify[i], item)) {
            encontrada = true;
            break;
        }
    }

    if (encontrada) {
        estrella.classList.add('favorito');
    } else {
        estrella.classList.remove('favorito');
    }

    estrella.addEventListener("click", () => {
        let monedaGuardada = {
            moneda: item.moneda,
            casa: item.casa,
            nombre: item.nombre,
            compra: item.compra,
            venta: item.venta,
            fechaActualizacion: item.fechaActualizacion,
        }

        // Obtener la lista de monedas favoritas desde localStorage y verificar si ya se encuentra almacenada
        let listaStringify = JSON.parse(localStorage.getItem("Favoritos")) || [];
        let encontrada = false;

        for (let i = 0; i < listaStringify.length; i++) {
            if (compararMonedas(listaStringify[i], monedaGuardada)) {
                encontrada = true;
            }
        }

        if (encontrada) {
            Alerta('LA MONEDA YA SE ENCUENTRA ALMACENADA EN FAVORITOS', 'warning')
        } else {
            listaStringify.push(monedaGuardada);
            localStorage.setItem("Favoritos", JSON.stringify(listaStringify));
            estrella.classList.toggle('favorito');
        }
    });

    caracteresContainer.appendChild(nombreElemento);
    caracteresContainer.appendChild(compraElemento);
    caracteresContainer.appendChild(ventaElemento);
    valorContainer.appendChild(caracteresContainer);
    valorContainer.appendChild(estrella);
    contenedorDatos.appendChild(valorContainer);
}


fetchDatos();
cambiarFechayHora();
cargarIndex();
botonFiltro.addEventListener("click", elegirMoneda);