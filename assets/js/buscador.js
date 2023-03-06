import * as products from "./script.js";
const formSearch = document.getElementById("formSeach");
const txtSearch = document.getElementById("txtSearch");

let resultados = [];
const suggestionsList = document.querySelector("#listSearchSuggestions");
document.querySelector("#txtSearch").addEventListener("keyup", (e) => {
  let letra = e.target.value;
  products.cargarDatos().then((datos) => {
    if (e.target.value !== "") {
      resultados = datos.filter((dato) =>
        dato.Producto.toLowerCase().includes(letra)
      );
      renderSuggestions(resultados);
    } else {
      suggestionsList.innerHTML = "";
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
    enlace.textContent = result.Producto;
    li.appendChild(enlace);
    suggestionsList.appendChild(li);
  });

  suggestionsList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      txtSearch.value = e.target.textContent;

      console.log(txtSearch.value);
    }
  });
  const btnBuscar = document.querySelector(".btn-outline-success");
  btnBuscar.addEventListener("click", (e) => {
    /* if (window.location.href = './productos.html') {
            
        } else {
            window.location.href = './pages/productos.html';
        } */
    e.preventDefault();
    resultados.forEach((result) => {
      if (result.Producto.includes(txtSearch.value)) {
        document.querySelector("main > div").innerHTML = "";
        const fila = document.createElement("div");
        fila.classList.add("row");
        document.querySelector("main > div").appendChild(fila);
        //mostrar productos en pantalla
        const prueba = products.createProductCard(result);
        fila.innerHTML += prueba;
        products.agregarFavoritos();
        products.agregarCarrito();
      }
    });
  });
}
