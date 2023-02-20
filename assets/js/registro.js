// <!-- Alerta en formulario -->
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          event.preventDefault();
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
              form.classList.add('was-validated')
        }, false)
    })
})()

//Animacion birds
window.addEventListener("DOMContentLoaded", () => {
  VANTA.BIRDS({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color1: 0x466446, 
    color2: 0x8db38d, 
    colorMode: "lerp", 
    birdSize: 1.7,
    wingSpan: 38.0,
    separation: 77.0,
    alignment: 36.0,
    cohesion: 27.0,
    quantity: 2.0,
    backgroundAlpha: 0.0,
  });

  const main = document.querySelector("main");
  main.style.opacity = 1;
  main.style.filter = "blur(0px)";
});
//Validar datos formulario
function validateName(name) {
  const regName = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]{3,50}$/;
  if (regName.test(name)) {
    document.querySelector('#invalid-name').style = 'display: none';
    return true;
  }else{
    document.querySelector('#invalid-name').style = 'display: block';
    return false;
  }
}

function validateEmail(email) {
  const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regEmail.test(email)) {
    document.querySelector('#invalid-email').style = 'display: none';
    return true;
  }else{
    document.querySelector('#invalid-email').style = 'display: block';
    return false;
  }
}

function validatePhone(phoneNumber) {
  const regPhone = /^\s*\d{10}\s*$/;
  if (regPhone.test(phoneNumber)) {
    document.querySelector('#invalid-tel').style = 'display: none';
    return true;
  }else{
    document.querySelector('#invalid-tel').style = 'display: block';
    return false;
  }
}

function validatePass(password) {
  const regPassword = /^.{8,}$/;
  if (regPassword.test(password)) {
    document.querySelector('#invalid-pass').style = 'display: none';
    return true;
  }else{
    document.querySelector('#invalid-pass').style = 'display: block';
    return false;
  }
}

function validateForm(name,email,tel,pass) {
  if(validateName(name) && validatePhone(tel) && validateEmail(email) && validatePass(pass)){
    //document.querySelector('#invalid-name').style = 'display: none;';
    return true
  }else{
    return false
  }
}


//Registrar usuario
const enviarform = document.querySelector('.needs-validation');
enviarform.addEventListener('submit', e => {
  e.preventDefault();
  //Obeter usuarios almacenados, si hay
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
  //Tomar los datos
  const name = document.getElementById('inputName');
  const email = document.getElementById('inputEmail');
  const telefono = document.getElementById('inputPhoneNumber');
  const password = document.getElementById('inputPassword');
  if(validateForm(name.value,email.value,telefono.value,password.value)){
    const Newuser = {
      id: usuarios.length + 1,
      name: name.value,
      email: email.value,
      telefono: telefono.value,
      password: password.value
    };
    //Agregar al array
    usuarios.push(Newuser);
    //Agregar array actulizado al localStogra
    localStorage.setItem('usuarios',JSON.stringify(usuarios));
  }else{
    console.log('por fin')
  }
})