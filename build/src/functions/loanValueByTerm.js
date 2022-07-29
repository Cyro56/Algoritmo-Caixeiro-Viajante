"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanTax = void 0;
function LoanTax(tax, term, value) {
    const pay = value * (1 + tax) ** term;
    return Number((pay / term).toFixed(2));
}
exports.LoanTax = LoanTax;
