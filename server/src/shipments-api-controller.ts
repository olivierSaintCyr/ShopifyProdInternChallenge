import express from 'express';
import { ShipmentsHandler } from './shipments-handler';

export class ShipementApiController {
    router = express.Router();

    constructor(private shipmentsHandler: ShipmentsHandler) {
        this.init()
    }

    private init() {
        // setups the get for every 
        this.router.post('/', (req, res) => {
            const { shipment } = req.body;
            console.log(shipment);
            if (shipment === undefined) res.sendStatus(400);
            if (shipment.products === undefined) res.sendStatus(400);
            try {
                this.shipmentsHandler.handle(shipment);
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
