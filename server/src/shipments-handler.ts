import { Product } from './products-manager';
import { ProductsManager } from './products-manager';

export interface Shipment {
    products: Product[];
}

// visitor of the productsManager
export class ShipmentsHandler {
    constructor(private productsManager: ProductsManager) {}

    handle(shipment: Shipment) {
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
    private mergeDuplicateInShipment(shipment: Shipment): Shipment {
        const mergedProducts = new Map<string, Product>();
        const products = shipment.products;
        products.forEach(({ name, qty }) => {
            const mergedProduct = mergedProducts.get(name);
            // if there is not already a merge product
            if (!mergedProducts) {
                const newQty = qty + mergedProduct.qty;
                mergedProduct.qty = newQty;
            } else {
                // set the new product in the map
                mergedProducts.set(name, { name, qty });
            }
        });
        // [...map.values()] <=> put all the values of the map in an array
        return { products: [...mergedProducts.values()] };
    }

    private isShipmentValid(shipment: Shipment): boolean {
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
