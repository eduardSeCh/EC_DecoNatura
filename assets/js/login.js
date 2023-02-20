const buttonIngresar = document.getElementById("formRegistro");
buttonIngresar.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailUser = document.getElementById("inputEmail");
    const passUser = document.getElementById("inputPassword");
    //Traer usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for (const user of usuarios) {
        if (emailUser.value === user.email && passUser.value === user.password) {
            const mensaje = new bootstrap.Modal(document.getElementById("welcomeModal"));
            const userNameModal = document.querySelector('.card-title');
            const emailModal = document.querySelector('#emailModal');
            const telModal = document.querySelector('#telModal')
            userNameModal.textContent = `Nos alegra verte ${user.name}`;
            emailModal.textContent = `Correo: ${user.email}`; 
            telModal.textContent = `Télefono: ${user.tel}`;
            mensaje.show();
            break;
        }
    }
});
