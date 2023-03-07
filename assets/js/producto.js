import * as products from "./script.js";
//dernar productos por categoria
products.cargarDatos().then(productos => {
  console.log(productos[0]) 
  document.getElementById('productosDecoracion').innerHTML = mostrarProductosPorCategoria(productos,'Decoración');
  document.getElementById('productosCocina').innerHTML = mostrarProductosPorCategoria(productos,'Cocina');
  document.getElementById('productosPlantas').innerHTML = mostrarProductosPorCategoria(productos,'Plantas de ornato');
  products.agregarFavoritos();
  products.agregarCarrito();

  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--lamparas'),'Lámparas',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--Velas'),'Velas',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--espejos'),'Espejo',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--cubiertos'),'Cubiertos',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--cristaleria'),'Cristalería ',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--vajilla'),'Vajilla',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--platos'),'Platos',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--suculentas'),'Suculentas',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--cactus'),'Cact\u00e1ceas',productos);
  agregarEventoClickCategoria(
    document.querySelector('#producto-categoria--macetas'),'Macetas',productos);
})

function mostrarProductosPorCategoria(productos, categoria) {
  let productosHTML = '';
  let contadorProductos = 0;

  for (const producto of productos) {
    if (producto.categoria === categoria && contadorProductos < 4) {
      productosHTML += products.createProductCard(producto);
      contadorProductos++;
    }
  }
  return productosHTML;
}

function agregarEventoClickCategoria(btn, categoria, productos) {
  btn.addEventListener('click', () => {
    let productosHTML = products.generarHTMLProductos(categoria, productos);
    document.querySelector('main > div.container-fluid').innerHTML = productosHTML;
    products.agregarFavoritos();
    products.agregarCarrito();
  });
}