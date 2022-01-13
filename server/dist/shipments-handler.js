"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentsHandler = void 0;
// visitor of the productsManager
class ShipmentsHandler {
    constructor(productsManager) {
        this.productsManager = productsManager;
    }
    handle(shipment) {
        const mergedShipement = this.mergeDuplicateInShipment(shipment);
        const shipmentValid = this.isShipmentValid(mergedShipement);
        if (!shipmentValid) {
            throw Error('Shipment invalid');
        }
        const products = mergedShipement.products;
        products.forEach(({ name, qty }) => {
            const { qty: inventoryQty } = this.productsManager.get(name);
            const updatedQty = inventoryQty - qty;
            this.productsManager.updateQty(name, updatedQty);
        });
    }
    // O(n) time complexity | O(n) space complexity (n: number of products in shipment)
    mergeDuplicateInShipment(shipment) {
        const mergedProducts = new Map();
        const products = shipment.products;
        products.forEach(({ name, qty }) => {
            const mergedProduct = mergedProducts.get(name);
            // if there is not already a merge product
            if (!mergedProducts) {
                const newQty = qty + mergedProduct.qty;
                mergedProduct.qty = newQty;
            }
            else {
                // set the new product in the map
                mergedProducts.set(name, { name, qty });
            }
        });
        // [...map.values()] <=> put all the values of the map in an array
        return { products: [...mergedProducts.values()] };
    }
    isShipmentValid(shipment) {
        const products = shipment.products;
        products.forEach(({ name, qty }) => {
            const product = this.productsManager.get(name);
            // if no product with name in manager
            if (!product) {
                return false;
            }
            if (product.qty < qty) {
                return false;
            }
        });
        return true;
    }
}
exports.ShipmentsHandler = ShipmentsHandler;
//# sourceMappingURL=shipments-handler.js.map