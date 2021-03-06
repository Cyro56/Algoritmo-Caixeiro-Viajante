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
exports.SimulationResponse = exports.CityPath = void 0;
const type_graphql_1 = require("type-graphql");
let CityPath = class CityPath {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CityPath.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CityPath.prototype, "path", void 0);
CityPath = __decorate([
    (0, type_graphql_1.ObjectType)()
], CityPath);
exports.CityPath = CityPath;
let SimulationResponse = class SimulationResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SimulationResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SimulationResponse.prototype, "response", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "loanValue", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "loanTerm", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "loanValueByTerm", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "loanAmountValue", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "loanFee", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "loanFeeAmountValue", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SimulationResponse.prototype, "proposalType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "maxValue", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "minValue", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "maxParcel", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SimulationResponse.prototype, "minParcel", void 0);
SimulationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], SimulationResponse);
exports.SimulationResponse = SimulationResponse;
