export interface Product {
    name: string,
    qty: number,
}
// A product manager with a cache system which permit that every method has an average of 
export class ProductsManager {
    private products = new Map<string, Product>(); // product name => Product
    private productsCache: Product[] = [];
    private lastCacheUpdate: Date;
    private lastProductUpdate: Date;

    constructor(initialProducts?: Product[]) {
        if (!initialProducts) return;
        this.initProducts(initialProducts);
    }

    // O(1) time complexity | O(1) space complexity
    createProduct(name: string, initialQty: number) {
        if (initialQty < 0) {
            throw Error('Initial quantity needs to be greater or equal to 0');
        }
        if (this.products.has(name)) {
            throw Error('Product already existing');
        }
        const newProduct: Product = { name, qty: initialQty };
        this.products.set(name, newProduct);
        this.lastProductUpdate = new Date();
    }

    // O(1) time complexity | O(1) space complexity
    removeProduct(name: string) {
        if (!this.products.has(name)) {
            throw Error(`Cannot delete product: ${name} not created`);
        }
        this.products.delete(name);
        this.lastProductUpdate = new Date();
    }

    // O(1) time complexity | O(1) space complexity
    updateName(currentName: string, nextName: string) {
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
    updateQty(name: string, qty: number) {
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

    has(name: string): boolean {
        return this.products.has(name);
    }

    get(name: string): Product | undefined {
        return this.products.get(name)
    }

    // O(n) time | O(n) space because of the new cache array creation 
    private updateCache() {
        this.productsCache = [...this.products.values()];
        this.lastCacheUpdate = new Date();
    }

    private initProducts(initialProducts: Product[]) {
        this.productsCache = [...initialProducts];
        initialProducts.forEach(({ name, qty }) => {
            if (this.products.has(name)) {
                throw Error(`Duplicate product name : ${name} in initial product list`);
            }

            if (qty < 0) {
                throw Error('Invalid quantity it needs to be greater or equal to 0');
            }
            const product: Product = { name, qty };
            this.products.set(name, product);
        });
        const date = new Date();
        this.lastProductUpdate = date;
        this.lastCacheUpdate = date;
    }
}
