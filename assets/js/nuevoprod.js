// Initialize a new ProductsController with currentId set to 0
const productsController = new ProductsController(0);

// Select the New Product Form
const newProductForm = document.querySelector('#newProductForm');

// Add an 'onsubmit' event listener
newProductForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();
    
    // Select the inputs
    const newProductName = document.querySelector('#nombreProd');
    const newProductPrice= document.querySelector('#precio');
    const newProductDescription = document.querySelector('#descripcion');
    const newProductImageUrl = document.querySelector('#imagen');    
    const newProductCategory = document.querySelector('#categoria');    
    const newProductSubcategory = document.querySelector('#subcategoria');    

    // Get the values of the inputs
    const name = newProductName.value;
    const precio =newProductPrice.value;
    const descripcion = newProductDescription.value;
    const img = newProductImageUrl.value;
    const categoria = newProductCategory.value;
    const subcategoria = newProductSubcategory.value;

    
    if(!nombreVal(name))
        newProductName.setCustomValidity("falló nombre");
    else
        newProductName.setCustomValidity("");
    
    if(!precioVal(precio))
        newProductPrice.setCustomValidity("falló precio");
    else
        newProductPrice.setCustomValidity("");

    if(!msjVal(descripcion))
        newProductDescription.setCustomValidity("falló desc");
    else
        newProductDescription.setCustomValidity("");

    if(!imgUrlVal(img))
        newProductImageUrl.setCustomValidity("falló url");
    else
    newProductImageUrl.setCustomValidity("");

    if(!catVal(categoria))
        newProductCategory.setCustomValidity("falló cat");
    else
        newProductCategory.setCustomValidity("");

    if(!catVal(subcategoria))
        newProductSubcategory.setCustomValidity("falló subcat");
    else
        newProductSubcategory.setCustomValidity("");
    
    if(nombreVal(name) && precioVal(precio) && msjVal(descripcion) && imgUrlVal(img) && catVal(categoria) && catVal(subcategoria)){
    
        // Add the item to the ProductsController //TODO: Cantidad
        productsController.addProduct(name,precio,descripcion,cantidad=1, img, categoria, subcategoria);
        console.log("Producto " + name.toUpperCase() +  " guardado.");
        // Clear the form
        
        newProductName.value = '';
        newProductPrice.value = '';
        newProductDescription.value = '';
        newProductImageUrl.value = '';
        newProductCategory.value = '';
        newProductSubcategory.value = '';
        
        document.getElementById("successMsg").innerHTML="El producto fue creado con éxito.";
        setTimeout(()=>{document.getElementById("successMsg").innerHTML="";},4000);
        document.getElementById("newProductForm").classList.remove("was-validated");
    }
    else{
        document.getElementById("newProductForm").classList.add("was-validated");
    }
    
});
