"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsManagerService = void 0;
const products_manager_1 = require("./products-manager");
class ProductsManagerService {
    get instance() {
        if (!ProductsManagerService.instance) {
            ProductsManagerService.instance = new products_manager_1.ProductsManager();
        }
        return ProductsManagerService.instance;
    }
}
exports.ProductsManagerService = ProductsManagerService;
//# sourceMappingURL=products-manager-service.js.map