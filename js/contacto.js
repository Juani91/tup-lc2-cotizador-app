document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('enviar').addEventListener('click', () => {

    email = document.getElementById('email').value.trim();
    nombre = document.getElementById('nombre').value,
    mensaje = document.getElementById('mensaje').value

    function validarMail(email) {
      emailValidado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailValidado.test(email);
    }

    if (!validarMail(email)) {
      Alerta('Por favor ingrese e-mail válido.', 'warning');
      return;
    }

    formulario = {
      nombre: nombre,
      email: email,
      mensaje: mensaje
    };

    emailjs.send('service_irw27ab', 'template_hjxsa2b', formulario, 'W25JQEpNq8ULE2UAn')
      .then(function (response) {
        console.log('¡Correo enviado con éxito!', response.status, response.text);
        Alerta('¡Correo enviado con éxito!', 'success');
        document.getElementById('formulario').reset();
      }, function (error) {
        console.error('¡Error al enviar el correo!', error);
        Alerta('¡Error al enviar el correo! Por favor, inténtalo de nuevo más tarde.', 'error');
      });
      email = document.getElementById('email').value= " ";
      nombre = document.getElementById('nombre').value= " ";
      mensaje = document.getElementById('mensaje').value= " ";
  });

  document.getElementById('limpiar').addEventListener('click', () => {
    email = document.getElementById('email').value= " ";
    nombre = document.getElementById('nombre').value= " ";
    mensaje = document.getElementById('mensaje').value= " ";
  });
});