const express = require('express');
const ProductManager = require('./productmanager.js');


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const productManager = new ProductManager();

app.get('/',(req,res) => {
    res.send('Welcome')
});


app.get('/products', async (req,res) => {
    let limit =  parseInt(req.query.limit);
    products = await productManager.getProducts()

    if(!limit || Number.isNaN(limit) || limit < 1 ){
    res.send(products);
    return;

    }

    const limitedProducts = products.slice(0, limit);
    return res.json(limitedProducts);
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProductById(parseInt(pid));

    if (!product) {
        res.send('No se encuentra el producto solicitado');
    } else {
        res.json(product);
    }
});

app.listen(8080, () => {
    console.log('Servidor en puerto 8080')
} );



