import { Router } from "express";
import fs from 'fs';


const router = Router();
const cartsPath = 'files/carts.json';

const loadCarts = () => {
    try {
        if (fs.existsSync(cartsPath)) {
            const data = fs.readFileSync(cartsPath, 'utf-8');
            const jsonData = JSON.parse(data);
            maxId = jsonData.maxId || 1;
            return jsonData.carts || [];

        }
        return [];
    } catch (error) {
        console.log('Error de carga de archivo: ', error);
        return [];
    }
};

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    

    if (!carts[cartId]) {
        res.status(404).json({ error: 'Carrito no existe' });
        return;
    }

    const existingProduct = carts[cartId].products.find(product => product.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        carts[cartId].products.push({ id: productId, quantity:1 });
    }

    saveCarts(carts);

    res.status(201).json({ message: 'Producto agregado al carrito' });
});

const saveCarts = (carts) => {
    try {
        const data = JSON.stringify({carts: carts, maxId: maxId}, null, '\t');
        fs.writeFileSync(cartsPath, data, 'utf8');
        console.log('Info de carrito guardada');
    } catch (error) {
        console.log('Error guardando carritos:', error);
    }
};

let maxId=0;
let carts = loadCarts();

router.post('/', async (req, res) => {
    maxId++;
    const cart = {
        id: maxId,
        products: []
    };
    carts.push(cart);
    saveCarts(carts);

    res.status(201).json({ cartId: maxId });
});

router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid)-1;
    const cart = carts[cartId];
    
    if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
        return;
    }

    res.json(cart.products);
});

export default router;