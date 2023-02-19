//colocar favortio
// Seleccionar todos los botones favorito-button
const guardarButton = document.querySelectorAll("#meGusta");

// Agregar un event listener a cada botón
let productos = [];
guardarButton.forEach((button, index) => {
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

    // Obtener el valor actual del localStorage para la clave "productos"
    const productosEnStorage = localStorage.getItem("productos");
    // Si hay valores en "productos" en el localStorage, convertirlo a un array
    if (productosEnStorage) {
      productos = JSON.parse(productosEnStorage);
    }

    // Agregar el nuevo producto al array de productos
    productos[productos.length] = productoJSON;
    // Convertir el array a un string JSON y almacenarlo en el localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    //Animacion me gusta
    button.classList.toggle("active")
  });
});
