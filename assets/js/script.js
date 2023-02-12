//Colocar productos -> pagina principal
const addProducts = () => {
  fetch("../../productos.json")
    .then((response) => response.json())
    .then((data) => { console.log(data[0].Producto)
      for (let i = 0; i < 4; i++) {
        console.log("Funciona? " + data[i].Producto);
        document.getElementById("productos").innerHTML += `
                <div class="col">
                    <img src="${data[i].Imagen}" alt="">
                    <hr>
                    <p class="precio">${data[i].Producto} Producto</p>
                </div>`;
        }
    });
};

addProducts();
