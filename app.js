// CARLOS EDUARDO CARAVANTES REYNOSO

const express = require("express");
const ProductManager = require("./ProductManager");
const app = express();
const manager = new ProductManager('products.txt');
const port = 8080;


app.get('/', (req, res) => {

    const html = "<html><body><h1 style='color:blue'>Bienvenidos al Product Manager!</h1></body></html>";

    res.send(html);
});


app.get('/products', async (req, res) => {

    let limit = parseInt(req.query.limit);

    let products = await manager.getProducts(limit);


    res.send(`La lista de productos actual es: ${JSON.stringify(products, null, 2)}`);

});


app.get('/products/:pid', async (req, res) => {

    let pid = parseInt(req.params.pid);

    let product = await manager.getProductById(pid);

    res.send(`El producto con id ${pid} es: ${JSON.stringify(product)}`);
});



app.listen(8080, (req, res) => {
    console.log(`Server running at port: ${port}`);
});
