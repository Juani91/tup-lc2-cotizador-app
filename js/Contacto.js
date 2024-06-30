document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('enviar').addEventListener('click', function (event) {
    event.preventDefault();
    email = document.getElementById('email').value.trim();
    nombre = document.getElementById('nombre').value,
    mensaje = document.getElementById('mensaje').value
    function validarMail(email) {
      emailValidado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailValidado.test(email);
    }
    if (!validarMail(email)) {
      alert('Por favor ingrese e-mail válido.');
      return;
    }
    formulario = {
      nombre: nombre,
      email: email,
      mensaje: mensaje
    };
    emailjs.send('service_x1dtktq', 'template_dag5nc4', formulario, 'WDMuRSBxfzzsEv0Pb')
      .then(function (response) {
        console.log('¡Correo enviado con éxito!', response.status, response.text);
        alert('¡Correo enviado con éxito!');
        document.getElementById('formulario').reset();

      }, function (error) {
        console.error('¡Error al enviar el correo!', error);
        alert('¡Error al enviar el correo! Por favor, inténtalo de nuevo más tarde.');
      });
  });

  document.getElementById('limpiar').addEventListener('click', function (event) {
    email = document.getElementById('email').value= " ";
    nombre = document.getElementById('nombre').value= " ";
    mensaje = document.getElementById('mensaje').value= " ";
  });
});