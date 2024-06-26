
// fetch("https://dolarapi.com/v1/dolares")
//     .then(response => response.json())
//     .then(data => {
//         const lista = data.map(d => ({
//             moneda: d.moneda,
//             casa: d.casa,
//             nombre: d.nombre,
//             compra: d.compra,
//             venta: d.venta,
//             fechaActualizacion: d.fechaActualizacion,
//         }));
//         console.log("Cotizaciones Dólares:", lista);
//     })
//     .catch(error => {
//         console.error(error);
//     });
const selectorMonedas = document.getElementById('select-moneda-index')

selectorMonedas.addEventListener('change', () => {
    const moneda = selectorMonedas.value;
    const contenedorDatos = document.querySelector('.cotizaciones-container-index')

    if (moneda == 'dolares'){
        fetch(`https://dolarapi.com/v1/${moneda}`)
        .then(response => response.json())
        .then(data => {
            const lista = data.map(d => ({
                moneda: d.moneda,
                casa: d.casa,
                nombre: d.nombre,
                compra: d.compra,
                venta: d.venta,
                fechaActualizacion: d.fechaActualizacion,
            }));
            console.log(lista);

        contenedorDatos.innerHTML = ''; // limpio pantalla
        lista.forEach(item => {
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

            caracteresContainer.appendChild(nombreElemento);
            caracteresContainer.appendChild(compraElemento);
            caracteresContainer.appendChild(ventaElemento);

            valorContainer.appendChild(caracteresContainer);
            valorContainer.appendChild(estrella);
            contenedorDatos.appendChild(valorContainer);
        });

        //    <div class="valor-container-index">
        //    <div class="caracteres-container-index">
        //        <h3>OFICIAL</h3>
        //        <div>
        //            <p>COMPRA</p>
        //            <h3>$869</h3>
        //        </div>
        //        <div>
        //            <p>VENTA</p>
        //            <h3>$909</h3>
        //        </div>
        //    </div>
        //    <i class="fa-solid fa-star"></i>
        });
    } else {
        fetch(`https://dolarapi.com/v1/cotizaciones/${moneda}`)
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
            console.log(objeto);

            contenedorDatos.innerHTML = ''; // limpio pantalla

            const valorContainer = document.createElement('div');
            valorContainer.className = 'valor-container-index';

            const caracteresContainer = document.createElement('div');
            caracteresContainer.className = 'caracteres-container-index';

            const nombreElemento = document.createElement('h3');
            nombreElemento.textContent = objeto.nombre.toUpperCase();

            const compraElemento = document.createElement('div');
            const compraTexto = document.createElement('p');
            compraTexto.textContent = 'COMPRA';
            const compraValor = document.createElement('h3');
            compraValor.textContent = `$${objeto.compra}`;
            compraElemento.appendChild(compraTexto);
            compraElemento.appendChild(compraValor);

            const ventaElemento = document.createElement('div');
            const ventaTexto = document.createElement('p');
            ventaTexto.textContent = 'VENTA';
            const ventaValor = document.createElement('h3');
            ventaValor.textContent = `$${objeto.venta}`;
            ventaElemento.appendChild(ventaTexto);
            ventaElemento.appendChild(ventaValor);

            const estrella = document.createElement('i');
            estrella.className = 'fa-solid fa-star';

            caracteresContainer.appendChild(nombreElemento);
            caracteresContainer.appendChild(compraElemento);
            caracteresContainer.appendChild(ventaElemento);

            valorContainer.appendChild(caracteresContainer);
            valorContainer.appendChild(estrella);
            contenedorDatos.appendChild(valorContainer);
        });
    };

})