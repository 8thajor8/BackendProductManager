import { Router } from "express";
import ProductManager from '../productmanager.js';

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req,res) => {
    let limit =  parseInt(req.query.limit);
    const products = await productManager.getProducts()

    if(!limit || Number.isNaN(limit) || limit < 1 ){
    res.send(products);
    return;

    }

    const limitedProducts = products.slice(0, limit);
    return res.json(limitedProducts);
});

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProductById(parseInt(pid));

    if (!product) {
        res.send('No se encuentra el producto solicitado');
    } else {
        res.json(product);
    }
});

router.post('/', async (req,res) => {
    const { title, description, code,  price, stock, category, thumbnail } = req.body;

    try {
        const product = productManager.addProduct(title, description, code,  price, stock, category, thumbnail);
        res.status(201).json({ message: 'Funcion Ejecutada' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    req.io.emit('newProduct', product);
});
 
router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const { property, newValue } = req.body;

    try {
        const updatedProduct = productManager.updateProduct(pid, property, newValue);
        res.status(200).json({ message: 'Funcion ejecutada' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    req.io.emit('updatedProduct', updatedProduct);
});

router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    try {
        const deletedProductId = productManager.deleteProduct(pid);
        res.status(200).json({ message: 'Funcion Ejecutada' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    req.io.emit('deletedProduct', deletedProductId);
});

export default router