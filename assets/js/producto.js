//Ordernar productos por categoria
async  function cargarDatos(){
  try {
    const response = await fetch('../../productos.json');
    const productos = await  response.json()

      let productosDecoracion = '';
      let contadorDecoProductos = 0;
      let productosCocina = '';
      let contadorCocinaPrductos = 0;
      let productosPlantas = '';
      let contadorPlantProductos = 0;

      for (const producto of productos) {
        switch (producto.Categoria) {
          case 'Decoracion':
            if (contadorDecoProductos == 4) continue;
            productosDecoracion += createProductCard(producto);
            contadorDecoProductos++;
            break;
          case 'Cocina':
            if (contadorCocinaPrductos == 4) continue;
            productosCocina += createProductCard(producto);
            contadorCocinaPrductos++;
            break;
          case 'Plantas de ornato':
            if (contadorPlantProductos == 4) continue;
            productosPlantas += createProductCard(producto);
            contadorPlantProductos++;
            break;
          default:
            break;
        }
      }
      document.getElementById('productosDecoracion').innerHTML =productosDecoracion;
      document.getElementById('productosCocina').innerHTML = productosCocina;
      document.getElementById('productosPlantas').innerHTML = productosPlantas;
      agregarFavoritos();
      agregarCarrito();
    //Click en lampara
    btnCategoryVelas = document.querySelector('#producto-categoria--lamparas');
    btnCategoryVelas.addEventListener('click',()=> {
      let lamparasHTML = generarHTMLProductos('Lamparas',productos);
      document.querySelector('main > div.container-fluid').innerHTML = lamparasHTML;
      agregarFavoritos();
      agregarCarrito();
    })
    //Click en Velas
    btnCategoryVelas = document.querySelector('#producto-categoria--Velas');
    btnCategoryVelas.addEventListener('click',()=> {
      let velasHtml = generarHTMLProductos('Velas',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = velasHtml;
    })
    //Click en Velas
    btnCategoryVelas = document.querySelector('#producto-categoria--espejos');
    btnCategoryVelas.addEventListener('click',()=> {
      let espejosHtml = generarHTMLProductos('Espejos',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = espejosHtml;
    })
    //Click en cubiertos
    btnCategoryVelas = document.querySelector('#producto-categoria--cubiertos');
    btnCategoryVelas.addEventListener('click',()=> {
      let cubiertosHtml = generarHTMLProductos('Cubiertos',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = cubiertosHtml;
    })
    //Click en Cristaleria
    btnCategoryVelas = document.querySelector('#producto-categoria--cristaleria');
    btnCategoryVelas.addEventListener('click',()=> {
      let cristaleriaHtml = generarHTMLProductos('Cristaleria',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = cristaleriaHtml;
    })
    //Click en Vajilla
    btnCategoryVelas = document.querySelector('#producto-categoria--vajilla');
    btnCategoryVelas.addEventListener('click',()=> {
      let vajillaHTML = generarHTMLProductos('Vajilla',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = vajillaHTML;
    })
    //Click en Suculentas
    btnCategoryVelas = document.querySelector('#producto-categoria--suculentas');
    btnCategoryVelas.addEventListener('click',()=> {
      let suculentasHTML = generarHTMLProductos('Suculentas',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = suculentasHTML;
    })
    //Click en Helechos TODO cambiar (figuras)
    btnCategoryVelas = document.querySelector('#producto-categoria--helechos');
    btnCategoryVelas.addEventListener('click',()=> {
      let helechosHTML = generarHTMLProductos('Figuras',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = helechosHTML;
    })
    //Click en Macetas
    btnCategoryVelas = document.querySelector('#producto-categoria--macetas');
    btnCategoryVelas.addEventListener('click',()=> {
      let macetasHTML = generarHTMLProductos('Maceta',productos);
      agregarFavoritos();
      agregarCarrito();
      document.querySelector('main > div.container-fluid').innerHTML = macetasHTML;
    })

  } catch (error) {
    console.log(error)
  }
}
cargarDatos()

function generarHTMLProductos(subcategoria, productos) {
  let html = `</div><div class="row my-4">`;
  let contadorProductos = 0;
  for (const producto of productos) {
    if (producto.Subcategoria === subcategoria) {
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
function createProductCard(producto) {
  return `
    <div class="fila col-12 col-md-6 col-lg-3">
      <div class="producto" id="producto-${producto.id}" style="width: 15rem;">
        <div class="producto_img">
          <img src="${producto.Imagen}" alt="...">
        </div>
        <div class="producto_categoria">
          <p>${producto.Categoria}</p>
        </div>
        <div class="producto_nombre">
          <h5>${producto.Producto}</h5>
        </div>
        <div class="producto_precio">
          <p>$${producto.Precio} MXN</p>
        </div>
        <button class="favorito-button" id="meGusta">
          <img src="../assets/img/iconos/favorito-icon-red.png" alt="">
        </button>
        <div>
          <button type="button" class="btn btn-secondary" id="btnCarrito">Añadir al carrito</button>
        </div>
      </div>
    </div>
  `;
}

//Colocar a favoritos
// Seleccionar todos los botones favorito-button
// Agregar a favoritos
function agregarFavoritos(){
  const btnFavoritos = document.querySelectorAll('.favorito-button');
  let favoritos = [];
  btnFavoritos.forEach((button) => {
    button.addEventListener("click", () => {
      const productoHTML = button.parentNode;
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
function agregarCarrito(){
  let carrito = [];
  const btnCarrito = document.querySelectorAll('#btnCarrito');
  btnCarrito.forEach((button) => {
    button.addEventListener("click", () => {
      const productoHTML = button.parentNode.parentNode;
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
    });
  });
}