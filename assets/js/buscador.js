const formSearch  = document.getElementById('formSeach');
const txtSearch = document.getElementById('txtSearch');
/* formSearch.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch('../../productos.json')
    .then(response => response.json())
    .then(datos => {
        let resultados = [];
        for (let i = 0; i < datos.length; i++) {
            if(datos[i].Producto.toLowerCase().includes(txtSearch.value)){
                resultados.push(datos[i]);
            }            
        }
        console.log('producto: ',resultados)
    })
}) */

let resultados = [];
const suggestionsList = document.querySelector('#listSearchSuggestions')
document.querySelector('#txtSearch').addEventListener('keyup',e => {
    let letra = e.target.value;
    fetch('../../productos.json')
    .then(response => response.json())
    .then(datos => {
        if (e.target.value !== '') {
            resultados = datos.filter(dato => dato.Producto.toLowerCase().includes(letra));
            renderSuggestions();
        }else{
            suggestionsList.innerHTML = "";
        }
    })
})

function renderSuggestions() {
    suggestionsList.innerHTML = "";
    resultados.forEach(result => {
        console.log(result.Producto)
        const li = document.createElement('li');
        const enlace = document.createElement('a');
        enlace.classList.add('dropdown-item');
        enlace.textContent = result.Producto;
        li.appendChild(enlace);
        suggestionsList.appendChild(li);
    })
    suggestionsList.addEventListener('click',(e) => {
        if(e.target.tagName === 'A'){
            txtSearch.value = e.target.textContent;
        }
    })
}