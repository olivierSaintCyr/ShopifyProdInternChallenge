import express from 'express';
import { ProductsManager } from './products-manager';

export class ProductsApiController {
    router = express.Router();

    constructor(private productsManager: ProductsManager) {
        this.init();
    }

    private init() {
        // setups the get for every 
        this.router.get('/', (req, res) => {
            const currentProducts = this.productsManager.getProducts();
            res.send(currentProducts);
        });

        this.router.put('/', (req, res) => {
            const { name, qty } = req.body;
            if (name === undefined || qty === undefined) res.sendStatus(400);
            try {
                this.productsManager.createProduct(name, qty);
                res.sendStatus(201);
            } catch (e) {
                res.sendStatus(400);
            }
        });

        this.router.post('/updateQuantity', (req, res) => {
            const { name, qty } = req.body;
            if (name === undefined || qty === undefined) res.sendStatus(400);
            try {
                this.productsManager.updateQty(name, qty);
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(400);
            }
        });

        this.router.post('/updateName', (req, res) => {
            const { currentName, nextName } = req.body;
            if (currentName === undefined || nextName === undefined) res.sendStatus(400);
            try {
                this.productsManager.updateName(currentName, nextName);
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(400);
            }
        });

        this.router.delete('/', (req, res) => {
            const { name } = req.body;
            if (name === undefined) res.sendStatus(400);
            try {
                this.productsManager.removeProduct(name);
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
