const fs = require("fs");

//clase ProductManager
class ProductManager {
    constructor(path) {
        this.products = []; //Se inicializa el arreglo vacío
        this.path = path;
    }

    //Método para agregar productos
    async addProduct(data) {
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

        const currentProducts = await this.getProducts(this.path);

        const codeExistence = currentProducts.findIndex((product) => product.code === data.code);

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

            currentProducts.push(newProduct);

            const productsString = JSON.stringify(currentProducts, null, 2);

            fs.promises
                .writeFile(this.path, productsString, "utf-8")
                .then(() => {
                    console.log("Se alamacena la información recibida.");
                })
                .catch((error) => {
                    console.log({ error })
                });

            return `Producto agregado con éxito. \n`;
        };       
    }

    //Consulta de todos los productos
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            if (!data) {
                throw new Error("El archivo JSON está vacío. \n");
            }
            const json = JSON.parse(data.replace(/\n/g, ""));
            return json
        } catch (error) {
            console.error(error);
        }
    }

    //Consulta de un producto determinado por su Id
    async getProductById(id) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            if(!data) {
                throw new Error("El archivo JSON está vacío. \n");
            }
            const json = JSON.parse(data.replace(/\n/g, ""));
            const product = json.find((product) => product.id === id);
            if (!product) {
                throw new Error(`No se encontraron productos con el ID ${id}. \n`);
            }
            return product;
        } catch (error) {
            console.error(error);
        }
    }

    async updateProduct(id, data) {
        try {
          const products = await this.getProducts();
          const index = products.findIndex((product) => product.id === id);
          if (index === -1) {
            throw new Error(`No se encontró ningún producto con el id ${id}`);
          }
          const product = products[index];
          const updatedProduct = { ...product, ...data, id };
          products.splice(index, 1, updatedProduct);
          const productsString = JSON.stringify(products, null, 2);
          await fs.promises.writeFile(this.path, productsString, "utf-8");
          console.log("Producto actualizado correctamente");
        } catch (error) {
          console.error(error);
        }
      }
}


module.exports = ProductManager;
