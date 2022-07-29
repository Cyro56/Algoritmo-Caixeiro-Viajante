"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatToNumber = exports.formatToMoney = exports.formatToDecimalValue = void 0;
const vanilla_masker_1 = __importDefault(require("vanilla-masker"));
function formatToDecimalValue(value) {
    const number = formatToNumber(value);
    return parseFloat((number / 100).toFixed(2));
}
exports.formatToDecimalValue = formatToDecimalValue;
function formatToMoney(value) {
    return vanilla_masker_1.default.toMoney(value !== null && value !== void 0 ? value : 0, {
        precision: 2,
        separator: ",",
        delimiter: ".",
        unit: "R$",
        zeroCents: false,
    });
}
exports.formatToMoney = formatToMoney;
function formatToNumber(value) {
    return vanilla_masker_1.default.toNumber(value !== null && value !== void 0 ? value : "");
}
exports.formatToNumber = formatToNumber;
