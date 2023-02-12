//Colocar productos -> pagina principal
const accesKey = 'AZLVkjSoxJlIBqWUcAs9gjPFGLhyA7NIknzqPJ0g2zQ'
const endPoint = 'https://api.unsplash.com/photos/'

async function getImages(query) {
  let response = await fetch();
  let jsonResponse = await response.json(`https://api.unsplash.com/search/photos/`);
  let imageList = await jsonResponse.results;
  console.log(imageList)
  createImages(imageList);  
}

function createImages(imagesList) {
  for (let i = 0; i < imagesList.length; i++) {
    const img = document.createElement('img');
    img.src = imagesList[i].urls.thumb;
    document.body.appendChild(img);
    
  }
}

getImages('U3YWF2n_q-M');


const addProducts = () => {
  fetch("../../productos.json")
    .then((response) => response.json())
    .then((data) => { console.log(data[0].Categoria)
      for (let i = 0; i < 4; i++) {
        //Productos destacados
        document.getElementById("productos").innerHTML += `
            <div class="col">
                <img src="${data[i].Imagen}" alt="">
                <hr>
                <p class="precio">${data[i].Producto}</p>
            </div>`;

        //Categorias
        document.getElementById("categoria").innerHTML += `
        <div class="col">
            <img src="${data[i].Imagen}" alt="">
            <hr>
            <p class="precio">${data[i].Categoria}</p>
        </div>`;
        }
    });
};

addProducts();
