import fs from 'fs'


//clase ProductManager
class ProductManager {
  #products;
  #path;
    constructor() {
        this.#products = this.#readProductsFromFile(); //Se inicializa el arreglo vacío
        this.#path = "../data/products.json";
    }

    #readProductsFromFile(){
      try {
        if(fs.existsSync(this.#path)) {
          return JSON.parse(fs.readFileSync(this.#path, "utf-8"));
        }
        return [];
      } catch (error) {
        console.log(`Ocurrió un error al obtener los productos: ${error}`);
      }
    }

    #saveProductsToFile(){
      try {
        fs.writeFileSync(this.#path, JSON.stringify(this.#products));
      } catch (error) {
        console.log(`Ocurrió un error al guardar los productos: ${error}`);
      }
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

        const currentProducts = this.#products;

        const codeExistence = currentProducts.findIndex(p => p.code === data.code);

        if (codeExistence !== -1) {
            return `El código de producto ${data.code} ya fue utilizado. \n`;
          } else {
            const newProduct = {
              id: currentProducts.length + 1,
              title: data.title,
              description: data.description,
              price: data.price,
              thumbnail: data.thumbnail,
              code: data.code,
              stock: data.stock
            }

            this.#products.push(newProduct);

            this.#saveProductsToFile();

            return `Producto agregado con éxito. \n`;
        };       
    }

    //Consulta de todos los productos
    getProducts(limit) {
      limit = Number(limit);
      if(limit > 0) {
        return (this.#products).slice(0, limit);
      }
      return this.#products;
    }

    //Consulta de un producto determinado por su Id
    getProductById(id) {
            if(!this.#products) {
                throw new Error("El archivo JSON está vacío. \n");
            }
            const json = this.#products;
            const product = json.find(p => p.id === id);
            if (!product) {
                throw new Error(`No se encontraron productos con el ID ${id}. \n`);
            }
            return product;
    }

    //Actualizacion de productos por id y datos a actualizar
    updateProduct(id, data) {
          const index = (this.#products).findIndex(p => p.id === id);
          if (index === -1) {
            throw new Error(`No se encontró ningún producto con el id ${id}`);
          }
          const product = (this.#products).filter(p => p.id === id);
          const updatedProduct = { ...product, ...data, id };
          (this.#products).splice(index, 1, updatedProduct);
          this.#saveProductsToFile();

          console.log("Producto actualizado correctamente");
      }

      //Eliminacion de un producto dado su id
      deleteProduct(id) {
          const index = (this.#products).findIndex((product) => product.id === id);
          if (index === -1) {
            throw new Error(`No se encontró ningún producto con el id ${id}`);
          }
          this.#products = (this.#products).filter(p => p.id !== id);
          this.#saveProductsToFile();
                    
          console.log("Producto eliminado correctamente");
      }
}


//module.exports = ProductManager;

export default ProductManager;
