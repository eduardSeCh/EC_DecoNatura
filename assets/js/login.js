const buttonIngresar = document.getElementById("formRegistro");
buttonIngresar.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailUser = document.getElementById("inputEmail");
    const passUser = document.getElementById("inputPassword");
    //Traer usuarios
    //const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    fetch(`https://deconatura.up.railway.app/api/users/email/${emailUser.value}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(user => {
        if (Object.keys(user).length > 0) {
            const mensaje = new bootstrap.Modal(document.getElementById("welcomeModal"));
            const userNameModal = document.querySelector('.card-title');
            userNameModal.textContent = `¡Nos alegra verte ${user.name}!`;
            mensaje.show();    
        } else {
            emailUser.textContent = 'usuario no existente...'
        }
    })
    .catch(error => {
        console.error('Error fetching user:', error);
        emailUser.textContent = 'Error al obtener usuario...'
    });

    /* if (emailUser.value === user.email && passUser.value === user.password) {
        const mensaje = new bootstrap.Modal(document.getElementById("welcomeModal"));
        const userNameModal = document.querySelector('.card-title');
       // const emailModal = document.querySelector('#emailModal');
       // const telModal = document.querySelector('#telModal')
        userNameModal.textContent = `¡Nos alegra verte ${user.name}!`;
       //  emailModal.textContent = `Correo: ${user.email}`;
       //  telModal.textContent = `Teléfono: ${user.tel}`;
        mensaje.show();
        break;
    } */
    /* for (const user of usuarios) {
        if (emailUser.value === user.email && passUser.value === user.password) {
            const mensaje = new bootstrap.Modal(document.getElementById("welcomeModal"));
            const userNameModal = document.querySelector('.card-title');
           // const emailModal = document.querySelector('#emailModal');
           // const telModal = document.querySelector('#telModal')
            userNameModal.textContent = `¡Nos alegra verte ${user.name}!`;
           //  emailModal.textContent = `Correo: ${user.email}`;
           //  telModal.textContent = `Teléfono: ${user.tel}`;
            mensaje.show();
            break;
        }
    } */
});
