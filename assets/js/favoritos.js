const storeData = JSON.parse(localStorage.getItem("favoritos"));
const tomarProducto = (storeData) => {
  if (storeData.length >= 1) {
    //document.querySelector(main).style = "height: 100vh";
    //producto = document.createElement("div");
    let listaFavoritos = document.getElementById("listaFavoritos");
    for (let i = 0; i < storeData.length; i++) {
      listaFavoritos.innerHTML += 
      `
      <div class="producto" id="producto-${storeData.id}">
            <div class="producto_img">
                <img src="${storeData[i].img}" alt="...">
            </div>
            <hr>
            <div class="producto_categoria">
                <div class="row">
                    <div class="col-5">
                        <p>${storeData[i].categoria}</p>
                    </div>
                    <div class="col-5">
                        <button class="favorito-button favorito-eliminar" id="meGusta">
                            <img src="../assets/img/iconos/favorito-icon-red.png" alt="">
                        </button>
                        <button type="button" class="carrito-button" id="btnCarrito">
                            <img src="../assets/img/iconos/carrito-de-compras.png" alt="" style="width:20px">
                        </button>
                    </div>    
                </div>
            </div>
            <div class="producto_nombre">
                <h5>${storeData[i].nombre}</h5>
            </div>
            <div class="producto_precio mb-2">
                <p>$${storeData[i].precio} MXN</p>
            </div>
        </div>
      `
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
