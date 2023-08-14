import { Router } from "express";

const router = Router();

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

export default router