"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsManager = void 0;
// A product manager with a cache system which permit that every method has an average of 
class ProductsManager {
    constructor(initialProducts) {
        this.products = new Map(); // product name => Product
        this.productsCache = [];
        if (!initialProducts)
            return;
        this.initProducts(initialProducts);
    }
    // O(1) time complexity | O(1) space complexity
    createProduct(name, initialQty) {
        if (initialQty < 0) {
            throw Error('Initial quantity needs to be greater or equal to 0');
        }
        if (this.products.has(name)) {
            throw Error('Product already existing');
        }
        const newProduct = { name, qty: initialQty };
        this.products.set(name, newProduct);
        this.lastProductUpdate = new Date();
    }
    // O(1) time complexity | O(1) space complexity
    removeProduct(name) {
        if (!this.products.has(name)) {
            throw Error(`Cannot delete product: ${name} not created`);
        }
        this.products.delete(name);
        this.lastProductUpdate = new Date();
    }
    // O(1) time complexity | O(1) space complexity
    updateName(currentName, nextName) {
        if (this.products.has(nextName)) {
            throw Error(`Cannot change ${currentName} to ${nextName} there is already a product ${nextName}`);
        }
        const product = this.products.get(currentName);
        if (!product) {
            throw Error(`Cannot change ${currentName} to ${nextName} there are no product ${currentName}`);
        }
        this.products.delete(currentName);
        product.name = nextName;
        this.products.set(nextName, product);
        this.lastProductUpdate = new Date();
    }
    // O(1) time complexity | O(1) space complexity
    updateQty(name, qty) {
        if (qty < 0) {
            throw Error('Invalid quantity it needs to be greater or equal to 0');
        }
        const product = this.products.get(name); // give the product ref with name: name
        if (!product) {
            throw Error(`Product: ${name} not found when updating quantity`);
        }
        product.qty = qty;
        this.lastProductUpdate = new Date();
    }
    // O(1) average time complexity O(n) worst | average O(1) space complexity worst O(n) when cache updates
    // (n: number of products in manager)
    getProducts() {
        if (this.lastProductUpdate > this.lastCacheUpdate) {
            this.updateCache();
        }
        return this.productsCache;
    }
    has(name) {
        return this.products.has(name);
    }
    get(name) {
        return this.products.get(name);
    }
    // O(n) time | O(n) space because of the new cache array creation 
    updateCache() {
        this.productsCache = [...this.products.values()];
        this.lastCacheUpdate = new Date();
    }
    initProducts(initialProducts) {
        this.productsCache = [...initialProducts];
        initialProducts.forEach(({ name, qty }) => {
            if (this.products.has(name)) {
                throw Error(`Duplicate product name : ${name} in initial product list`);
            }
            if (qty < 0) {
                throw Error('Invalid quantity it needs to be greater or equal to 0');
            }
            const product = { name, qty };
            this.products.set(name, product);
        });
        const date = new Date();
        this.lastProductUpdate = date;
        this.lastCacheUpdate = date;
    }
}
exports.ProductsManager = ProductsManager;
//# sourceMappingURL=products-manager.js.map