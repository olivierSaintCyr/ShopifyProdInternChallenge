"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const initial_products_1 = require("./initial-products");
const products_api_controller_1 = require("./products-api-controller");
const products_manager_1 = require("./products-manager");
const shipements_api_controller_1 = require("./shipements-api-controller");
const shipments_handler_1 = require("./shipments-handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const productsManager = new products_manager_1.ProductsManager(initial_products_1.initialProducts); // initial product is an optionnal params
const productsApi = new products_api_controller_1.ProductsApiController(productsManager);
app.use('/products', productsApi.router);
const shipmentsHandler = new shipments_handler_1.ShipmentsHandler(productsManager);
const shipmentsApi = new shipements_api_controller_1.ShipementApiController(shipmentsHandler);
app.use('/shipments', shipmentsApi.router);
const port = 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
//# sourceMappingURL=index.js.map