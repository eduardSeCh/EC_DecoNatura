//colocar favortio
// Seleccionar todos los botones favorito-button
const btnFavoritos = document.querySelectorAll("#meGusta");
// Agregar a favoritos
let favoritos = [];
btnFavoritos.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productoHTML = document.getElementById(`producto-${index + 1}`);
    const productoJSON = {
      id: productoHTML.getAttribute("id"),
      img: productoHTML.querySelector(".producto_img img").getAttribute("src"),
      categoria: productoHTML.querySelector(".producto_categoria p")
        .textContent,
      nombre: productoHTML.querySelector(".producto_nombre h5").textContent,
      precio: productoHTML.querySelector(".producto_precio p").textContent,
    };

    // Obtener el valor actual del localStorage para la clave "favoritos"
    const favoritosEnStorage = localStorage.getItem("favoritos");
    // Si hay valores en "favoritos" en el localStorage, convertirlo a un array
    if (favoritosEnStorage) {
      favoritos = JSON.parse(favoritosEnStorage);
    }

    // Agregar el nuevo producto al array de favoritos
    favoritos[favoritos.length] = productoJSON;
    // Convertir el array a un string JSON y almacenarlo en el localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    //Animacion me gusta
    button.classList.toggle("active")
  });
});


// Agregar a Carrito
let carrito = [];
const btnCarrito = document.querySelectorAll('#btnCarrito');
btnCarrito.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productoHTML = document.getElementById(`producto-${index + 1}`);
    const productoJSON = {
      id: productoHTML.getAttribute("id"),
      img: productoHTML.querySelector(".producto_img img").getAttribute("src"),
      categoria: productoHTML.querySelector(".producto_categoria p")
        .textContent,
      nombre: productoHTML.querySelector(".producto_nombre h5").textContent,
      precio: productoHTML.querySelector(".producto_precio p").textContent,
    };

    // Obtener el valor actual del localStorage para la clave "carrito"
    const carritoEnStorage = localStorage.getItem("carrito");
    // Si hay valores en "carrito" en el localStorage, convertirlo a un array
    if (carritoEnStorage) {
      carrito = JSON.parse(carritoEnStorage);
    }

    // Agregar el nuevo producto al array de carrito
    carrito[carrito.length] = productoJSON;
    // Convertir el array a un string JSON y almacenarlo en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
});
