// Carlos Eduardo Caravantes Reynoso

const fs = require('fs');

class ProductManager {

    #path
    // DEFINIMOS CONSTRUCTOR
    constructor(path) {
        this.#path = path;
        this.format = 'utf-8';
    };


    // METODO GET_PRODUCTS
    getProducts = async (limit) => {
        let reading = fs.existsSync(this.#path) ? JSON.parse(await fs.promises.readFile(this.#path, { encoding: this.format })) : [];
        let l = reading.length;

        if (limit){
            let products = l >= limit ? reading.slice(0, limit) : reading;
            console.log(products);
            return products;
        } else {
            let products = [...reading];
            console.log(products);
            return products;
        }

    };


    // // METODO PARA GENERAR LOS IDs AUTOINCREMENTALES
    getNextId = async (count) => {
        const nextId = (count > 0) ? count+1 : 1;
        console.log(nextId);
        return nextId;
    }


    // METODO PARA AGREGAR PRODUCTOS NUEVOS
    addProduct = async (title, description, price, thumbnail, code, stock) => {

        // Validacion de parametros (completitud)
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            let status = { error: "ERROR: Faltan datos para agregar el producto" };
            console.log(status);
            return status;
        }

        // Validamos que exista el path de manera scinrona para evitar condiciones de carrera
        let products = await this.getProducts();

        // Validacion x codigo ingresado
        if (products.find(product => product.code === code)) {
            let status = { error: "ERROR: Codigo de producto ya existente" };
            console.log(status);
            return status;
        }

        // Creamos el nuevo producto
        const newProduct = {
            id: await this.getNextId(products.length),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        //Agregamos el nuevo producto
        products.push(newProduct);

        // Persistencia del cambio y Log
        fs.promises.writeFile(this.#path, JSON.stringify(products));

        let status = { success: 'Producto agregado con exito' };
        console.log(status);
        return status;
    };

    // METODO PARA RETORNAR UN PRODUCTO POR ID
    getProductById = async (id) => {

        // Lectura del archivo y parsing
        let products = await this.getProducts();

        // Validacion de existencia del producto y retorno si existe
        if (products.find(product => product.id === id)) {
            let product_found = products.find(product => product.id === id)
            console.log('Producto encontrado', product_found);
            return product_found;
        } else {
            let status = { error: 'Producto no encontrado' }
            console.log(status);
            return status;
        }
    };

    // METODO PARA BORRAR UN PRODUCTO X ID
    deleteProduct = async(id) => {

    // Validacion del path y lectura del archivo sincronapara evitar condiciones de carerra
        let products = await this.getProducts();

        // Buscamos el index del producto que tenga el id que buscamos
        const idx = products.findIndex(product => product.id === id);

        // Validacion de existencia y eliminado
        if (idx >= 0) {
            products.splice(idx, 1)
        }
        else {
            console.log({ error: 'Error: No existen elementos con ese ID' });
            return { status: 'Error: no existen elementos con ese ID' }
        }

        // Persistencia y Log
        fs.promises.writeFile(this.#path, JSON.stringify(products));

        let status = { status: 'Producto eliminado exitosamente' }
        console.log(status);

    };

    // METODO PARA ACTUALIZAR UN PRODUCTO X ID Y CAMPOS
    updateProduct = async (id, obj) => {

        // Lectura del archivo de manera sincrona para evitar condiciones de carrera
        let products = await this.getProducts();

        // Obtenemos el id del producto que buscamos
        const idx = products.findIndex(product => product.id === id);

        // Validacion del Id
        if (idx < 0) {
            console.log({ error: 'Error: No existen elementos con ese ID' });
            return { status: 'Error: no existen elementos con ese ID' }
        }

        // Validacion de si los campos del objeto enviado coinciden con los campos de los Productos
        if (!Object.keys(obj).every((key) => Object.keys(products[0]).includes(key))) {
            console.log({ error: 'Los campos a modificar no coinciden con el esquema' });
            return { status: 'Los campos a modificar no coinciden con el esquema' }
        }


        // Actualizacion de los campos
        for (const key of Object.keys(obj)) {
            products[idx][key] = obj[key]
            console.log('PRODUCTO: ', products[idx][key] , '\nOBJ NUEVO: ', obj[key])
        }

        // Persistencia y Log
        fs.promises.writeFile(this.#path, JSON.stringify(products));
        let status = { status: 'Producto actualizado exitosamente' }
        console.log(status);

    }

};

module.exports = ProductManager;