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


// INICIO COMENTARIO DE LO DEL NICO  <------------------------------------------------------------
/*
const selectorMonedas = document.getElementById('select-moneda-index');

selectorMonedas.addEventListener('change', () => {
    const moneda = selectorMonedas.value;
    const contenedorDatos = document.querySelector('.cotizaciones-container-index');

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
*/
// FIN COMENTARIO DE LO DEL NICO <------------------------------------------------------------


const botonFiltro = document.getElementById('boton-filtro');


const contenedorDatos = document.querySelector('.cotizaciones-container-index');

let selectorMonedas = document.getElementById('select-moneda-index');

let arrayDolares = [];
let arrayCotizaciones = [];
let arrayGeneral = [];

function mostrarTodas() {

  let arrayGeneral = [];
  let listaStringify = [];

  fetch('https://dolarapi.com/v1/dolares')
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
      console.log(arrayDolares);
      arrayDolares.forEach(elemento => arrayGeneral.push(elemento));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  fetch('https://dolarapi.com/v1/cotizaciones')
    .then(response => response.json())
    .then(data => {
      arrayCotizaciones = data.map(d => ({
        moneda: d.moneda,
        casa: d.casa,
        nombre: d.nombre,
        compra: d.compra,
        venta: d.venta,
        fechaActualizacion: d.fechaActualizacion,
      }));
      console.log(arrayCotizaciones);
      arrayCotizaciones.forEach(elemento => arrayGeneral.push(elemento));
      arrayGeneral.splice(7, 1);

      contenedorDatos.innerHTML = '';

      arrayGeneral.forEach(item => {
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
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  console.log(arrayGeneral);
}
console.log(arrayGeneral);

function mostrarIndividuales(moneda) {

  fetch(`https://dolarapi.com/v1/${moneda}`)
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
      estrella.addEventListener("click", () => {
        // localStorage.setItem('Moneda', objeto);
        // console.log("Moneda: ", objeto);
      })

      caracteresContainer.appendChild(nombreElemento);
      caracteresContainer.appendChild(compraElemento);
      caracteresContainer.appendChild(ventaElemento);

      valorContainer.appendChild(caracteresContainer);
      valorContainer.appendChild(estrella);
      contenedorDatos.appendChild(valorContainer);
    });
}




  


mostrarTodas();

botonFiltro.addEventListener("click", () => {
  let moneda = selectorMonedas.value;
  contenedorDatos.innerHTML = '';

  if (moneda == 'TODAS') {
    mostrarTodas();
  } else {
    mostrarIndividuales(moneda);
  }
})

const textoFecha = document.querySelector('.texto-datos-actualizados');



function cambiarFechayHora() {
  setInterval(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    textoFecha.innerHTML = `Datos actualizados al ${formattedDate}`;
  }, 1000);
}
cambiarFechayHora();


//setInterval(cambiarFechayHora, 5000);

// function empezarIntervalo() {
//   intervalo = setInterval(function() {
//       console.log("Mensaje cada 1 segundo..");
//   }, 1000)