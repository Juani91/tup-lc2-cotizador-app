
const botonFiltro = document.getElementById('boton-filtro');
const contenedorDatos = document.querySelector('.cotizaciones-container-index');
let selectorMonedas = document.getElementById('select-moneda-index');

let arrayDolares = [];
let arrayCotizaciones = [];
let listaStringify = [];

// Comparar si dos objetos de monedas son iguales
function compararMonedas(moneda1, moneda2) {
  return moneda1.moneda === moneda2.moneda &&
         moneda1.casa === moneda2.casa &&
         moneda1.nombre === moneda2.nombre &&
         moneda1.compra === moneda2.compra &&
         moneda1.venta === moneda2.venta &&
         moneda1.fechaActualizacion === moneda2.fechaActualizacion;
}

// Función para obtener información de la API y mostrar todas las cotizaciones
function mostrarTodas() {
  let arrayGeneral = [];

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
      arrayCotizaciones.forEach(elemento => arrayGeneral.push(elemento));
      arrayGeneral.splice(7, 1); // Eliminar el octavo elemento (USD Oficial) para que no se repita en el arrayGeneral

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

        // Agregar evento de "click" para marcar la moneda como favorita
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
          estrella.classList.toggle('favorito');
          
          for (let i = 0; i < listaStringify.length; i++) {
            if (compararMonedas(listaStringify[i], monedaGuardada)) {
              encontrada = true;
            }
          }
          
          if (encontrada) {
            alert("La moneda ya se encuentra almacenada en favoritos");
          } else {
            listaStringify.push(monedaGuardada);
            localStorage.setItem("Favoritos", JSON.stringify(listaStringify));
          }
        });

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
}

// Función para obtener información de la API y mostrar las cotizaciones del dólar
function mostrarDolares() {

  contenedorDatos.innerHTML = '';

  arrayDolares.forEach(item => {
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
      estrella.classList.toggle('favorito');

      for (let i = 0; i < listaStringify.length; i++) {
        if (compararMonedas(listaStringify[i], monedaGuardada)) {
          encontrada = true;
        }
      }
    
      if (encontrada) {
        alert("La moneda ya se encuentra almacenada en favoritos");
      } else {
        listaStringify.push(monedaGuardada);
        localStorage.setItem("Favoritos", JSON.stringify(listaStringify));
      }
    });

    caracteresContainer.appendChild(nombreElemento);
    caracteresContainer.appendChild(compraElemento);
    caracteresContainer.appendChild(ventaElemento);
    valorContainer.appendChild(caracteresContainer);
    valorContainer.appendChild(estrella);
    contenedorDatos.appendChild(valorContainer);
  });
}

// Función para obtener información de la API y mostrar el resto de las cotizaciones
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

      contenedorDatos.innerHTML = '';

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
        let monedaGuardada = {
          moneda: objeto.moneda,
          casa: objeto.casa,
          nombre: objeto.nombre,
          compra: objeto.compra,
          venta: objeto.venta,
          fechaActualizacion: objeto.fechaActualizacion,
        }

        // Obtener la lista de monedas favoritas desde localStorage y verificar si ya se encuentra almacenada
        let listaStringify = JSON.parse(localStorage.getItem("Favoritos")) || [];
        let encontrada = false;
        estrella.classList.toggle('favorito');    
        
        for (let i = 0; i < listaStringify.length; i++) {
          if (compararMonedas(listaStringify[i], monedaGuardada)) {
            encontrada = true;
          }
        }
    
        if (encontrada) {
          alert("La moneda ya se encuentra almacenada en favoritos");
        } else {
          listaStringify.push(monedaGuardada);
          localStorage.setItem("Favoritos", JSON.stringify(listaStringify));
        }
      });

      caracteresContainer.appendChild(nombreElemento);
      caracteresContainer.appendChild(compraElemento);
      caracteresContainer.appendChild(ventaElemento);
      valorContainer.appendChild(caracteresContainer);
      valorContainer.appendChild(estrella);
      contenedorDatos.appendChild(valorContainer);
    });
}

// Agregar evento de "click" al botón de filtro para mostrar las cotizaciones según la selección
botonFiltro.addEventListener("click", () => {
  let moneda = selectorMonedas.value;
  contenedorDatos.innerHTML = '';

  if (moneda == 'TODAS') {
    mostrarTodas();
  } else if (moneda == 'dolares') {
    mostrarDolares();
  } else {
    mostrarIndividuales(moneda);
  }
});

// Obtener el elemento donde se mostrará la fecha de actualización
const textoFecha = document.querySelector('.texto-datos-actualizados');

// Función para actualizar la fecha y hora de los datos
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
  }, 30000);
}

cambiarFechayHora();

mostrarTodas();
setInterval(mostrarTodas, 30000);