async function fetchInicial() {
    const arrayNombresDolar = ['dolares', 'cotizaciones/eur', 'cotizaciones/brl', 'cotizaciones/clp', 'cotizaciones/uyu'];
    const listaDolares = [];
    const listaOtrasCotizaciones = [];
    const listaStringify = [];

    try {
        for (let i = 0; i < arrayNombresDolar.length; i++) {
            const url = `https://dolarapi.com/v1/${arrayNombresDolar[i]}`;
            const response = await fetch(url);
            const data = await response.json();

            if (i === 0) {
                const arrayDolares = data.map(d => ({
                    moneda: d.moneda,
                    casa: d.casa,
                    nombre: d.nombre,
                    compra: d.compra,
                    venta: d.venta,
                    fechaActualizacion: d.fechaActualizacion,
                }));
                listaDolares.push(...arrayDolares);
            } else {
                const objetoCotizacion = {
                    moneda: data.moneda,
                    casa: data.casa,
                    nombre: data.nombre,
                    compra: data.compra,
                    venta: data.venta,
                    fechaActualizacion: data.fechaActualizacion,
                };
                listaOtrasCotizaciones.push(objetoCotizacion);
            }
        }

        mostrarDatos(listaDolares, listaOtrasCotizaciones, listaStringify);
    } catch (error) {
        console.error('Error:', error);
    }
}

function mostrarDatos(listaDolares, listaOtrasCotizaciones, listaStringify) {
    const contenedorDatos = document.querySelector('.cotizaciones-container-index');

    // Mostrar 'dolares'
    listaDolares.forEach(item => {
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
        estrella.addEventListener("click", () => {
          //localStorage.setItem(nombre, `${item.nombre}`);
          let monedaGuardada = {
            nombre: item.nombre,
            valorCompra: item.compra,
          }
          listaStringify.push(monedaGuardada) // iterar la lista y validar que no se repita el ingreso
          localStorage.setItem("Favoritos", JSON.stringify([listaStringify]));
        })

        caracteresContainer.appendChild(nombreElemento);
        caracteresContainer.appendChild(compraElemento);
        caracteresContainer.appendChild(ventaElemento);

        valorContainer.appendChild(caracteresContainer);
        valorContainer.appendChild(estrella);
        contenedorDatos.appendChild(valorContainer);
    });

    // Mostrar otras cotizaciones
    listaOtrasCotizaciones.forEach(item => {
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
        estrella.addEventListener("click", () => {
          //localStorage.setItem(nombre, `${item.nombre}`);
          let monedaGuardada = {
            nombre: item.nombre,
            valorCompra: item.compra,
          }
          listaStringify.push(monedaGuardada) // iterar la lista y validar que no se repita el ingreso
          localStorage.setItem("Favoritos", JSON.stringify([listaStringify]));
        })

        caracteresContainer.appendChild(nombreElemento);
        caracteresContainer.appendChild(compraElemento);
        caracteresContainer.appendChild(ventaElemento);

        valorContainer.appendChild(caracteresContainer);
        valorContainer.appendChild(estrella);
        contenedorDatos.appendChild(valorContainer);
    });
}

fetchInicial();
