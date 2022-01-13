"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductManagerService = void 0;
const product_manager_1 = require("./product-manager");
class ProductManagerService {
    get instance() {
        if (!ProductManagerService.instance) {
            ProductManagerService.instance = new product_manager_1.ProductManager();
        }
        return ProductManagerService.instance;
    }
}
exports.ProductManagerService = ProductManagerService;
//# sourceMappingURL=product-manager-service.js.map