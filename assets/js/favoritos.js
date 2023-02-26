const storeData = JSON.parse(localStorage.getItem("favoritos"));
const tomarProducto = (storeData) => {
  if (storeData.length >= 1) {
    //document.querySelector(main).style = "height: 100vh";
    //producto = document.createElement("div");
    let listaFavoritos = document.getElementById("listaFavoritos");
    for (let i = 0; i < storeData.length; i++) {
      listaFavoritos.innerHTML += `
        <div class="producto" style="width: 15rem;">
          <button class="favorito-eliminar" id="${i}">
            <img src="../assets/img/iconos/favorito-icon-red.png" alt="">
          </button>
          <div class="producto_img">
            <img src="${storeData[i].img}" alt="...">
          </div>
          <div class="producto_categoria">
            <p>${storeData[i].categoria}</p>
          </div>
          <div class="producto_nombre">
            <h5>${storeData[i].nombre}</h5>
          </div>
          <div class="producto_precio">
            <p>${storeData[i].precio}</p>
          </div>
          <div>
           <button type="button" class="btn btn-secondary">Añadir al carrito</button>
          </div>
        </div`;
    }
    //Inicializa el carousel
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: storeData.length > 2 ? 3 : storeData.length,
        },
        1000: {
          items: storeData.length > 3 ? 4 : storeData.length > 2 ? 3 : storeData.length,
        },
      },
    });
  } else {
    document.querySelector(
      ".row"
    ).innerHTML += `<p>No tienes favoritos por el momento</p>`;
  }
};
tomarProducto(storeData);

//Eliminar producto
const eliminarProducto = (id) => {
  if (storeData) {
    // Busca el índice del producto con el id proporcionado
    /* const index = storeData.findIndex(
      (producto) => producto.id === "producto-" + id
    ); */
    // Elimina el producto del array
    storeData.splice(id, 1);
    // Vuelve a guardar los datos actualizados en el localStorage
    localStorage.setItem("favoritos", JSON.stringify(storeData));
    //eliminarProducto.parentNode.remove();
  }
};

// Añade un event listener a los botones de eliminar
const botonesEliminar = document.querySelectorAll(".favorito-eliminar");
botonesEliminar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const id = boton.getAttribute("id");
    console.log("su id:", id);
    console.log(boton);
    eliminarProducto(id);
    location.reload();
  });
});
