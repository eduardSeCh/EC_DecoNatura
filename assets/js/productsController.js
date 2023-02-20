
class ProductsController {
    constructor(currentId = 0){
        this.items = [];
        this.currentId = currentId;
    }

    // add Items method
    addProduct(name,precio,descripcion,cantidad, img, categoria, subcategoria){
        const item = {
            "id": this.currentId++,
            "Nombre producto": name,
            "Precio": precio,
            "Descripcion": descripcion,
            "Cantidad": cantidad,
            "Link imagen": img,
            "Categoria": categoria,
            "Subcategoria": subcategoria
        };

        this.items.push(item);
        localStorage.setItem("items", JSON.stringify(this.items));
    }
}