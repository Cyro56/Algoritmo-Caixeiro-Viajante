"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const client_1 = require("@apollo/client");
const Queries_1 = require("../GraphQL/Queries");
function GetPath() {
    const { error, loading, data } = (0, client_1.useQuery)(Queries_1.getPath);
    try {
        console.log('LOADING: ' + loading);
        return <react_native_1.Text>{data === null || data === void 0 ? void 0 : data.getRecipes[0].path}</react_native_1.Text>;
    }
    catch (_a) {
        return <react_native_1.Text>{JSON.stringify(error, null, 2)}</react_native_1.Text>;
    }
}
exports.default = GetPath;
