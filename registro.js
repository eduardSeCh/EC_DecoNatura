// <!-- Alerta en formulario -->
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
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
    color1: 0x466446, // cambio
    color2: 0x8db38d, // cambio
    colorMode: "lerp", //cambio
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
