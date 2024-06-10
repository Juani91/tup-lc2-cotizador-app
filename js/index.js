
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
            console.log("otras monedas:", lista);
        })
})