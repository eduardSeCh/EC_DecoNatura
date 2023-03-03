const storeData = JSON.parse(localStorage.getItem("carrito"));

let subtotal = 0;
let envio = 80.0;
const tomarProducto = () => {
  if (storeData.length >= 1) {
    let listaCarrito = document.createElement("div");
    listaCarrito.classList.add("listaCarrito");
    //Cargar productos a acarrito
    for (let i = 0; i < storeData.length; i++) {
      //Cargar subtotal
      listaCarrito.innerHTML += `
      <div class="row justify-content-around align-items-center my-3">
          <div class="col-12 col-sm-6 col-md-3 col-lg-3 producto_img">
            <img src="${storeData[i].img}" alt="..." width=100% style="border-radius: 3%;">
          </div>
          <div class="producto_categoria col-12 col-sm-6 col-md-3 col-lg-2">
            <h3>${storeData[i].nombre}</h3>
            <p>${storeData[i].categoria}</p>
          </div>
          <div class="input-group col-12 col-sm-6 col-md-2 col-lg-3">
            <button class="btn btn-outline-secondary decrement-btn" type="button">-</button>
            <input type="number" class="form-control numberProduct text-center" style="background-color: #f7f7f700;" value="1" data-precio="${parseInt(
              storeData[i].precio.match(/\d+/)[0]
            )}">
            <button class="btn btn-outline-secondary increment-btn" type="button">+</button>
          </div>
          <div class="producto_precio col-12 col-sm-6 col-md-2 col-lg-2">
            <p>${storeData[i].precio} MXN</p>
          </div>
          <div class="col-12 col-sm-12 col-md-2 col-lg-2">
            <button type="button" class="btn btn-outline-danger" id="${i}">Eliminar</button>
          </div>
      </div`;
      document.querySelector("main").appendChild(listaCarrito);

      subtotal += parseInt(storeData[i].precio.match(/\d+/)[0]);
    }
    //Secciono envio y compra de carrito
    const Secciontotal = document.querySelector("main").insertAdjacentHTML(
      "beforeend",
      `
      <div class="row d-flex flex-wrap justify-content-center pagoSection">
      <hr size="2">
        <div class="col-8 text-end">
          <h4>Envio</h4> 
          <p>Subtotal</p>
          <h4>Total</h4> 
          </div>
          <div class="col text-start">
          <p>$${envio} MXN</p> 
          <p id="subtotal">$${subtotal} MXN</p>
          <p id="total">$${subtotal + envio} MXN</p>
          <button type="button" class="btn btn-comprar" data-toggle="modal" data-target="#modalCompra">
            Comprar
            <div class="button_horizontal"></div>
            <div class="button_vertical"></div>
          </button>
        </div>
        <h3>Aceptamos</h3>
        <div class="row metodosPago">
          <img src="../assets/img/visa.png" alt="">
          <img src="../assets/img/paypal.png" alt="">
          <img src="../assets/img/oxxo.png" alt="">
        </div>
      </div>
      `
    );
  } else {
    document.querySelector(
      'main'
    ).innerHTML += `<p>No tienes Productos en tu carrito </p>`;
  }
};
tomarProducto();

//Aumentar -  disminuir cantidad producto
const btnDecrement = document.querySelectorAll(".decrement-btn");
btnDecrement.forEach((boton) => {
  boton.addEventListener("click", () => {
    const input = boton.closest(".input-group").querySelector(".numberProduct");
    if (input.value > 0) {
      input.value--;
      subtotal -= parseFloat(input.dataset.precio) * input.value;
      document.querySelector("#subtotal").textContent = `$${subtotal} MXN`;
      document.querySelector("#total").textContent = `$${subtotal + envio} MXN`;
    }
  });
});
const btnIncrement = document.querySelectorAll(".increment-btn");
btnIncrement.forEach((boton) => {
  boton.addEventListener("click", () => {
    const input = boton.closest(".input-group").querySelector(".numberProduct");
    input.value++;
    subtotal += parseFloat(input.dataset.precio);
    document.querySelector("#subtotal").textContent = `$${subtotal} MXN`;
    document.querySelector("#total").textContent = `$${subtotal + envio} MXN`;
  });
});

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
    localStorage.setItem("carrito", JSON.stringify(storeData));
    //eliminarProducto.parentNode.remove();
  }
};

// Añade un event listener a los botones de eliminar
const botonesEliminar = document.querySelectorAll(".btn-outline-danger");
botonesEliminar.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    const id = boton.getAttribute("id");
    console.log("su id:", id);
    console.log(boton);
    eliminarProducto(id);
    document
      .querySelector(".listaCarrito")
      .removeChild(boton.parentElement.parentElement);
    location.reload();
  });
});

const btnComprar = document.querySelector('.btn-comprar');

btnComprar.addEventListener('click', () => {
  // Creamos un div para el mensaje personalizado
  const mensaje = document.createElement('div');
  mensaje.textContent = '¡Compra realizada con éxito!';
  mensaje.style.backgroundColor = '#28a745';
  mensaje.style.color = 'white';
  mensaje.style.padding = '10px';
  mensaje.style.position = 'absolute';
  mensaje.style.top = '10px';
  mensaje.style.right = '10px';
  mensaje.style.borderRadius = '5px';
  
  // Añadimos el mensaje al body
  document.body.appendChild(mensaje);
  
  // Ocultamos el mensaje después de 3 segundos
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 3000);
});
