class ItemsController {
    constructor(currentId = 0){
        this.items = [];
        this.currentId = currentId;
    }

    // add Items method
    addItem(name,precio,descripcion,cantidad, img, categoria, subcategoria ){
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
    }
}