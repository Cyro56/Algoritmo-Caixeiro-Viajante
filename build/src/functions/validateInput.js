"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputValue = void 0;
const validateInputValue = (insertValue, minValue, maxValue) => {
    if (insertValue < minValue)
        return "Error below";
    else if (insertValue > maxValue)
        return "Error above";
    else
        return "Valid input";
};
exports.validateInputValue = validateInputValue;
