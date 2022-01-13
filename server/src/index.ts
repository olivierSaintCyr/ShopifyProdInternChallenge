import express from 'express';
import { initialProducts } from './initial-products';
import { ProductsApiController } from './products-api-controller';
import { ProductsManager } from './products-manager';
import { ShipementApiController } from './shipements-api-controller';
import { ShipmentsHandler } from './shipments-handler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsManager = new ProductsManager(initialProducts); // initial product is an optionnal params
const productsApi = new ProductsApiController(productsManager);
app.use('/products', productsApi.router);

const shipmentsHandler = new ShipmentsHandler(productsManager);
const shipmentsApi = new ShipementApiController(shipmentsHandler);
app.use('/shipments', shipmentsApi.router);

const port = 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
