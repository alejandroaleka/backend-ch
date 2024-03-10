//clase ProductManager
class ProductManager {
    #products;
    static productId = 0;
    constructor(){
        this.#products = []; //Se inicializa el arreglo vacío
    }

    //Método para agregar productos
    addProduct(data) {
        if (
            !data.title || 
            !data.description || 
            !data.price || 
            !data.thumbnail || 
            !data.code || 
            !data.stock
        ) {
            return "Error: Todos los campos son obligatorios. \n";
        }

        const codeExistence = this.#products.some(p => p.code === data.code);

        const currentIndex = this.#products;

        if (codeExistence) {
            return `El código de producto ${data.code} ya fue utilizado. \n`;
          } else {
            const newProduct = {
              id: currentIndex.length + 1,
              title: data.title,
              description: data.description,
              price: data.price,
              thumbnail: data.thumbnail,
              code: data.code,
              stock: data.stock
            }
            this.#products.push(newProduct);
            return `Producto agregado con éxito. \n`;
        };       
    }

    //Consulta de todos los productos
    getProducts() {
        return this.#products;
    }

    //Consulta de un producto determinado por su Id
    getProductById(id) {
        try {
            const product = this.#products.find((p) => p.id === id);
            if(!product) {
                throw new Error(`No se encontraron productos con el ID ${id}`);
            }
            return product;
        } catch (err) {
            console.error(err);
        }
    }

}


module.exports = ProductManager;
