enviarMail = document.gete

// Array de opiniones (puedes agregar más si quieres)
const opiniones = [
    {
        imagen: "img/muchachon.jpg",
        nombre: "Ramon Alvarez",
        comentario: "La mejor página de laboratorio."
    },
    {
        imagen: "img/muchachon.jpg",
        nombre: "Ramon Alvarez",
        comentario: "Muy interesante"
    },
    {
        imagen: "img/muchachon.jpg",
        nombre: "Ramon Alvarez",
        comentario: "Muy útil! Me ayuda en mi día a día financiero"
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