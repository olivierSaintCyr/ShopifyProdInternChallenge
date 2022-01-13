"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsApiController = void 0;
const express_1 = __importDefault(require("express"));
class ProductsApiController {
    constructor(productsManager) {
        this.productsManager = productsManager;
        this.router = express_1.default.Router();
        this.init();
    }
    init() {
        // setups the get for every 
        this.router.get('/', (req, res) => {
            const currentProducts = this.productsManager.getProducts();
            res.send(currentProducts);
        });
        this.router.put('/', (req, res) => {
            const { name, qty } = req.body;
            if (name === undefined || qty === undefined)
                res.sendStatus(400);
            try {
                this.productsManager.createProduct(name, qty);
                res.sendStatus(201);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
        this.router.post('/updateQuantity', (req, res) => {
            const { name, qty } = req.body;
            if (name === undefined || qty === undefined)
                res.sendStatus(400);
            try {
                this.productsManager.updateQty(name, qty);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
        this.router.post('/updateName', (req, res) => {
            const { currentName, nextName } = req.body;
            if (currentName === undefined || nextName === undefined)
                res.sendStatus(400);
            try {
                this.productsManager.updateName(currentName, nextName);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
        this.router.delete('/', (req, res) => {
            const { name } = req.body;
            if (name === undefined)
                res.sendStatus(400);
            try {
                this.productsManager.removeProduct(name);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
exports.ProductsApiController = ProductsApiController;
//# sourceMappingURL=products-api-controller.js.map