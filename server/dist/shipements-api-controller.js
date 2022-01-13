"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipementApiController = void 0;
const express_1 = __importDefault(require("express"));
class ShipementApiController {
    constructor(shipmentsHandler) {
        this.shipmentsHandler = shipmentsHandler;
        this.router = express_1.default.Router();
        this.init();
    }
    init() {
        // setups the get for every 
        this.router.post('/', (req, res) => {
            const { shipment } = req.body;
            console.log(shipment);
            if (shipment === undefined)
                res.sendStatus(400);
            if (shipment.products === undefined)
                res.sendStatus(400);
            try {
                this.shipmentsHandler.handle(shipment);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
exports.ShipementApiController = ShipementApiController;
//# sourceMappingURL=shipements-api-controller.js.map