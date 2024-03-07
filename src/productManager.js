//clase ProductManager
class ProductManager {
    constructor(){
        this.products = []; //Se inicializa el arreglo vacío
    }

    //Método para agregar productos
    addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
    }

    //Método para retornar el array de productos
    getProducts() {
        return this.products;
    }

    //Método para retornar un producto a partir de un Id
    getProductById(id) {

    }
}

