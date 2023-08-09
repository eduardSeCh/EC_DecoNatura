//tomar datos API
export  async  function cargarDatos(){
    try {
      const response = await fetch('../../productos.json');
      const productos = await  response.json()
      return productos;
  
    } catch (error) {
      console.log(error)
    }
   /* const response = fetch(`https://deconatura.up.railway.app/api/catalogo`)
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.log(error));  */
}

export function generarHTMLProductos(subcategoria, productos) {
    let html = `</div><div class="row my-4">`;
    let contadorProductos = 0;
    for (const producto of productos) {
      if (producto.Subcategoría === subcategoria) {
        html += createProductCard(producto); 
        contadorProductos++;
        if (contadorProductos === 4) {
          html += '</div><div class="row my-4">';
          contadorProductos = 0;
        }
      }
    }
    return html;
  }

//Plantilla del producto
export function createProductCard(producto) {
    return `
    <div class="fila col-12 col-md-6 col-lg-3">
        <div class="producto" id="producto-${producto.id}" style="width: 15rem;">
            <div class="producto_img">
                <img src="${producto.Link}" alt="...">
            </div>
            <hr>
            <div class="producto_categoria">
                <div class="row">
                    <div class="col-5">
                        <p>${producto.Categoría}</p>
                    </div>
                    <div class="col-7 align-items-center">
                        <button class="favorito-button" id="meGusta">
                          <img src="../assets/img/iconos/favorito-icon-red.png" alt="">
                        </button>
                        <button type="button" class="carrito-button" id="btnCarrito">
                          <img src="../assets/img/iconos/carrito-de-compras.png" alt="" style="width:20px">                                                                               
                        </button>
                    </div>    
                </div>
            </div>
            <div class="producto_nombre">
                <h5>${producto.Producto}</h5>
            </div>
            <div class="producto_precio mb-2">
                <p>$${producto.Precio} MXN</p>
            </div>
        </div>
    </div>`;
  }

//Colocar a favoritos
// Seleccionar todos los botones favorito-button
// Agregar a favoritos
export function agregarFavoritos(){
    const btnFavoritos = document.querySelectorAll('.favorito-button');
    let favoritos = [];
    btnFavoritos.forEach((button) => {
      button.addEventListener("click", () => {
        const productoHTML = button.parentNode.parentNode.parentNode.parentNode;
        const productoJSON = {
          id: productoHTML.getAttribute("id"),
          img: productoHTML.querySelector(".producto_img img").getAttribute("src"),
          categoria: productoHTML.querySelector(".producto_categoria p")
            .textContent,
          nombre: productoHTML.querySelector(".producto_nombre h5").textContent,
          precio: productoHTML.querySelector(".producto_precio p").textContent,
        };
        console.log(productoJSON)
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
  }
  
  // Agregar a Carrito
  export function agregarCarrito(){
    let carrito = [];
    const btnCarrito = document.querySelectorAll('#btnCarrito');
    btnCarrito.forEach((button) => {
      button.addEventListener("click", () => {
        const productoHTML = button.parentNode.parentNode.parentNode.parentNode;
        const productoJSON = {
          id: productoHTML.getAttribute("id"),
          img: productoHTML.querySelector(".producto_img img").getAttribute("src"),
          categoria: productoHTML.querySelector(".producto_categoria p")
            .textContent,
          nombre: productoHTML.querySelector(".producto_nombre h5").textContent,
          precio: productoHTML.querySelector(".producto_precio p").textContent,
        };
        console.log(productoJSON);
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

        //Animacion carrito
        button.classList.add("active")
        /* button.addEventListener('transitionend',()=> {
          button.classList.remove("active");
        }, {once: true}); */
      });
    });
  }