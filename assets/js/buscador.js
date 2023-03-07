import * as products from "./script.js";
const txtSearch = document.getElementById("txtSearch");

let resultados = [];
const suggestionsList = document.querySelector("#listSearchSuggestions");
document.querySelector("#txtSearch").addEventListener("keyup", (e) => {
  let letra = e.target.value.toLowerCase();
  products.cargarDatos().then((datos) => {
    if (letra !== "") {
      resultados = datos.filter((dato) =>
        dato.producto.toLowerCase().includes(letra) ||
        dato.categoria.toLowerCase().includes(letra) ||
        dato.subcategoria.toLowerCase().includes(letra)        
      );
      console.log(resultados)
      if (resultados.length == 0) {
        document.querySelector('main').innerHTML = "<p>No hay elementos que coincidan</p>";
      } 
      renderSuggestions(resultados);
    } else {
      suggestionsList.innerHTML = "<p>No hay elementos que coincidan</p>";
    }
  });
});

function renderSuggestions(resultados) {
  suggestionsList.innerHTML = "";

  resultados.forEach((result) => {
    //Mostrar lista de sugerencias
    const li = document.createElement("li");
    const enlace = document.createElement("a");
    enlace.classList.add("dropdown-item");
    enlace.textContent = result.producto;
    li.appendChild(enlace);
    suggestionsList.appendChild(li);
  });

  const btnBuscar = document.querySelector(".btn-outline-success");
  btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector("main > div").innerHTML = "";
    const fila = document.createElement("div");
    fila.classList.add("row");

    resultados.forEach((result) => {
        document.querySelector("main > div").appendChild(fila);
        //mostrar productos en pantalla
        const prueba = products.createProductCard(result);
        fila.innerHTML += prueba;
        products.agregarFavoritos();
        products.agregarCarrito();
    });
  });
}

suggestionsList.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    txtSearch.value = e.target.textContent;
    const productosOrdenados = ordenarPorProducto(resultados, txtSearch.value)
    console.log(productosOrdenados)
    renderSuggestions(productosOrdenados, txtSearch.value)

    console.log(txtSearch.value);
  }else{
    document.querySelector('main').innerHTML = "<p>No hay elementos que coincidan</p>";    
  }
});

function ordenarPorProducto(productos, busqueda) {
  // Convierte la cadena de búsqueda a minúsculas
  const busquedaEnMinusculas = busqueda.toLowerCase();

  // Filtra los productos que incluyen la cadena de búsqueda en su propiedad 'Producto'
  const productosFiltrados = productos.filter(producto => producto.producto.toLowerCase().includes(busquedaEnMinusculas));

  // Ordena los productos filtrados por su propiedad 'Producto'
  productosFiltrados.sort((a, b) => (a.producto > b.producto) ? 1 : -1);

  return productosFiltrados;
}
