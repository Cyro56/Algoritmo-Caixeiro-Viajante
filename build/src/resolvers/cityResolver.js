"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reciperesolver = void 0;
const type_graphql_1 = require("type-graphql");
const city_1 = require("../entities/city");
const uuid_1 = require("uuid");
const driver_1 = require("../../driver");
let Reciperesolver = class Reciperesolver {
    getRecipes() {
        let newPath = { id: (0, uuid_1.v4)(), path: (0, driver_1.DriverRoute)("F", "F") };
        return [newPath];
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [city_1.CityPath]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], Reciperesolver.prototype, "getRecipes", null);
Reciperesolver = __decorate([
    (0, type_graphql_1.Resolver)()
], Reciperesolver);
exports.Reciperesolver = Reciperesolver;