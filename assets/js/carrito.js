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
          <div class="col-12 col-sm-6 col-md-3 col-lg-2 nombreAndCategoria text-center">
            <h3>${storeData[i].nombre}</h3>
            <p>${storeData[i].categoria}</p>
          </div>
          <div class="input-group col-12 col-sm-6 col-md-2 col-lg-3">
            <button class="btn btn-outline-secondary decrement-btn" type="button">-</button>
            <input type="number" class="form-control numberProduct text-center" style="background-color: #f7f7f700;" value="1" data-precio="${parseFloat(
              storeData[i].precio.match(/\d+/)[0]
            )}">
            <button class="btn btn-outline-secondary increment-btn" type="button">+</button>
          </div>
          <div class="col-12 col-sm-6 col-md-2 col-lg-2" id="precio-${i}">
            <p>${storeData[i].precio}</p>
          </div>
          <div class="col-12 col-sm-12 col-md-2 col-lg-2">
            <button type="button" class="btn btn-outline-danger" id="${i}">
            <img src="../assets/img/iconos/icono_botebasura.png" alt="">
            </button>
          </div>
      </div`;
      document.querySelector("main").appendChild(listaCarrito);

      subtotal += parseInt(storeData[i].precio.match(/\d+/)[0]);
    }
    //Secciono envio y compra de carrito
    const Secciontotal = document.querySelector("main").insertAdjacentHTML(
      "beforeend",
      `
      <hr size="2" class="m-2">
      <div class="row d-flex flex-wrap justify-content-center pagoSection">
        <div class="col-8 text-center">
          <div class="d-flex justify-content-end">
            <h5 class="m-2">Envío</h5> <p class="m-2">$${envio} MXN</p> 
          </div>
          <div class="d-flex justify-content-end">
            <h5 class="m-2">Subtotal</h5> <p class="m-2" id="subtotal">$${subtotal} MXN</p>
          </div>
          <div class="d-flex justify-content-end">
            <hr size="2" class="m-2" width=20%>
          </div>
          <div class="d-flex justify-content-end">
            <h4 class="m-2">Total</h4> <p class="m-2" id="total">$${subtotal + envio} MXN</p>
          </div>
          </div>
          <div class="col justify-content-center">
            <button type="button" class="btn btn-comprar" data-toggle="modal" data-target="#modalCompra">
              Comprar
              <div class="button_horizontal"></div>
              <div class="button_vertical"></div>
          </button>
          </div>
        </div>
      </div>

      <div class="row metodosPago mt-5 justify-content-end">
          <h4 class="text-start">Aceptamos</h4>
          <div class="col-12 col-md-4 my-3">
            <img src="../assets/img/iconos/icono_visa.svg" alt="ícono de visa" style="height: 25px;">
          </div>
          <div class="col-12 col-md-4 my-3">
            <img src="../assets/img/iconos/icono_paypal.svg" alt="ícono de paypal" style="height: 27px;">
          </div>
          <div class="col-12 col-md-4 my-3">
            <img src="../assets/img/iconos/icono_oxxo.svg" alt="ícono de oxxo" style="height: 37px;">
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
      parseFloat(document.querySelector('.numberProduct').value)
    }
  });
});
const btnIncrement = document.querySelectorAll(".increment-btn");
btnIncrement.forEach((boton,index) => {
  boton.addEventListener("click", () => {
    const input = boton.closest(".input-group").querySelector(".numberProduct");
    input.value++;
    subtotal += parseFloat(input.dataset.precio);
    document.querySelector("#subtotal").textContent = `$${subtotal} MXN`;
    document.querySelector("#total").textContent = `$${subtotal + envio} MXN`;
    document.querySelector(`#precio-${index} > p`).textContent = `$${input.dataset.precio*input.value} MXN`
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
  let modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('id', 'modalCompra');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'modalCompraLabel');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCompraLabel">Confirmar compra</h5>
        </div>
        <div class="modal-body">
          Compra realizada :)
        </div>
     </div>
    </div>
  `;
  // agrega el modal al cuerpo de la página
  document.querySelector('body').appendChild(modal);

  // muestra el modal
  let modalInstance = new bootstrap.Modal(document.querySelector('#modalCompra'));
  modalInstance.show();
  
  // Ocultamos el mensaje después de 3 segundos
  setTimeout(() => {
    modalInstance.hide();
  }, 3000);

});
