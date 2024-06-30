document.addEventListener('DOMContentLoaded', function() {
document.getElementById('enviar').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    
    // Validar el campo de email
    email = document.getElementById('email').value.trim();
    nombre= document.getElementById('nombre').value,
    mensaje= document.getElementById('mensaje').value
    function validarMail(email) {
        emailValidado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailValidado.test(email);
      }
    if (!validarMail(email)) {
      alert('Por favor ingrese e-mail válido.');
      return;
    }
    // Recoger los valores del formulario
    formulario = {
      nombre: nombre,
      email: email,
      mensaje: mensaje
    };
  
    // Enviar el formulario usando EmailJS
    emailjs.send('service_x1dtktq', 'template_dag5nc4', formulario, 'WDMuRSBxfzzsEv0Pb')
      .then(function(response) {
        console.log('¡Correo enviado con éxito!', response.status, response.text);
        alert('¡Correo enviado con éxito!');
        // Puedes agregar aquí cualquier otra acción que desees después de enviar el correo
      }, function(error) {
        console.error('¡Error al enviar el correo!', error);
        alert('¡Error al enviar el correo! Por favor, inténtalo de nuevo más tarde.');
      });
  
    // Limpiar el formulario después de enviar
    document.getElementById('formulario').reset();
  });
});

