import * as products from "./script.js";

products.cargarDatos().then(productos => {

    const productosOrdenador = [...productos];
    productosOrdenador.sort( (a,b) => a.Precio - b.Precio)
    let productosFila1 = [];
    let productosFila2 = [];
    let contador = 0;
    for (const producto of productosOrdenador) {
        const productoCard = products.createProductCard(producto)
        if(contador < 4) {
            productosFila1.push(productoCard);
        }else{
            productosFila2.push(productoCard);
        }
        contador++;
        if(contador === 8) break;
    }
    const fila1HTML = `<div class="row my-4">${productosFila1.join('')}</div>`;
    const fila2HTML = `<div class="row my-4">${productosFila2.join('')}</div>`;

    document.querySelector('#fila-1').innerHTML =
    fila1HTML;
    document.querySelector('#fila-2').innerHTML =
    fila2HTML
    
    products.agregarFavoritos();
    products.agregarCarrito();
})