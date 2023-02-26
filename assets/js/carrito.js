const storeData = JSON.parse(localStorage.getItem("carrito"));

let subtotal = 0;
let envio = 80.00;
const tomarProducto = () => {
  if (storeData.length >= 1) {
    let listaCarrito = document.createElement('div');
    listaCarrito.classList.add('listaCarrito');
    //Cargar productos a acarrito
    for (let i = 0; i < storeData.length; i++) {
      //Cargar subtotal
      listaCarrito.innerHTML += `
      <div class="row justify-content-between align-items-center m-5" style="height: 80%;">
          <div class=" col-2">
            <img src="${storeData[i].img}" alt="..." width=100%>
          </div>
          <div class="producto_categoria col-3">
            <h3>${storeData[i].nombre}</h3>
            <p>${storeData[i].categoria}</p>
            </div>
          <div class="input-group col-2" style="width: 13%;">
            <button class="btn btn-outline-secondary decrement-btn" type="button">-</button>
            <input type="number" class="form-control numberProduct" style="background-color: #f7f7f700;" value="1" data-precio="${parseInt(storeData[i].precio.match(/\d+/)[0])}">
            <button class="btn btn-outline-secondary increment-btn" type="button">+</button>
            </div>
            <div class="producto_precio col-3">
            <p>${storeData[i].precio}</p>
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-outline-danger" id="${i}">Eliminar</button>
          </div>
      </div`;
        document.querySelector('main').appendChild(listaCarrito);

        subtotal += parseInt(storeData[i].precio.match(/\d+/)[0]);
    }
    const Secciontotal = document.querySelector('main').insertAdjacentHTML('beforeend',
    `
    <div class="row d-flex flex-wrap justify-content-center">
    <hr size="2">
    <div class="col-8 text-end">
        <h4>Envio</h4> 
        <p>Subtotal</p>
        <h4>Total</h4> 
        </div>
        <div class="col text-start">
        <p>$${envio}</p> 
        <p id="subtotal">$${subtotal} MXN</p>
        <p id="total">$${subtotal+envio} MXN</p>
        </div>
        </div>
        `)
  } else {
    document.querySelector(
      ".row"
    ).innerHTML += `<p>No tienes Productos en tu carrito</p>`;
  }
};

tomarProducto();

//Aumentar -  disminuir cantidad producto
const btnDecrement = document.querySelectorAll('.decrement-btn');
btnDecrement.forEach((boton) => {
  boton.addEventListener('click',()=> {
    const input = boton.closest('.input-group').querySelector('.numberProduct');
    if (input.value > 0) {
      input.value--;
      subtotal -= parseFloat(input.dataset.precio) * input.value;
      document.querySelector('#subtotal').textContent = `$${subtotal} MXN`;
      document.querySelector('#total').textContent = `$${subtotal+envio} MXN`
    }
  })
})
const btnIncrement = document.querySelectorAll('.increment-btn');
btnIncrement.forEach((boton) => {
  boton.addEventListener('click',()=> {
    const input = boton.closest('.input-group').querySelector('.numberProduct');
      input.value++;
       subtotal += parseFloat(input.dataset.precio);
       document.querySelector('#subtotal').textContent = `$${subtotal} MXN`;
       document.querySelector('#total').textContent = `$${subtotal+envio} MXN`
  })
})

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
botonesEliminar.forEach((boton,index) => {
  boton.addEventListener("click", () => {
    const id = boton.getAttribute('id');
    console.log("su id:", id);
    console.log(boton);
    eliminarProducto(id);
    document.querySelector('.listaCarrito').removeChild(boton.parentElement.parentElement);
    location.reload();
  });
});