enviarMail = document.gete

// Array de opiniones (puedes agregar más si quieres)
const opiniones = [
    {
        imagen: "img/muchachon.jpg",
        nombre: "Ramón Alvarez",
        comentario: "La información se ve confiable, muchas gracias!"
    },
    {
        imagen: "img/chica.webp",
        nombre: "Kary",
        comentario: "Como aumenta el dólar!"
    },
    {
        imagen: "img/chico.jpg",
        nombre: "Miguel",
        comentario: "Muy útil! Me ayuda en mi día a día financiero."
    }
];

let index = 0;
const opinionContainer = document.querySelector('.contenedor-reseña');

// Función para cambiar la opinión cada 5 segundos
function cambiarOpinion() {
    opinionContainer.innerHTML = `
            <div class="persona">
                <img src="${opiniones[index].imagen}" alt="${opiniones[index].nombre}">
                <h2>${opiniones[index].nombre}</h2>
            </div>
            <div class="texto-reseña">
                <p>${opiniones[index].comentario}</p>
            </div>
    `;
    index = (index + 1) % opiniones.length; // Avanza al siguiente índice circularmente
}

// Cambiar la opinión inicial
cambiarOpinion();

// Cambiar la opinión cada 5 segundos
setInterval(cambiarOpinion, 4000);