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
exports.RiskEntity = void 0;
const typeorm_1 = require("typeorm");
let RiskEntity = class RiskEntity {
    id;
    ip;
    operating_system;
    user_id;
    email;
    device_id;
    time_zone;
    timestamp;
    risk_level_ia;
};
exports.RiskEntity = RiskEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RiskEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "::1" }),
    __metadata("design:type", String)
], RiskEntity.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Windows' }),
    __metadata("design:type", String)
], RiskEntity.prototype, "operating_system", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '-1' }),
    __metadata("design:type", Number)
], RiskEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'null' }),
    __metadata("design:type", String)
], RiskEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '-1' }),
    __metadata("design:type", Number)
], RiskEntity.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'G-0' }),
    __metadata("design:type", String)
], RiskEntity.prototype, "time_zone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RiskEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RiskEntity.prototype, "risk_level_ia", void 0);
exports.RiskEntity = RiskEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'risk' })
], RiskEntity);
//# sourceMappingURL=risk-entiy.js.map