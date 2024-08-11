"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = calculateDiscount;
function calculateDiscount(price, discountCode) {
    if (price <= 0) {
        return 'Invalid price';
    }
    let discount = 0;
    if (discountCode === 'SAVE10') {
        discount = 0.1;
    }
    else if (discountCode === 'SAVE20') {
        discount = 0.2;
    }
    return price - price * discount;
}
