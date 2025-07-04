"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let RiskService = class RiskService {
    async registrarRiesgo(data) {
        const { ip, operatingSystem, userId, email, deviceId, timeZone } = data;
        const riesgo = `${ip},${operatingSystem},${userId},${email},${deviceId},${timeZone}`;
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${riesgo}\n`;
        const logDir = path.join(__dirname, '..', 'logs');
        const logPath = path.join(logDir, 'risk.log');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        fs.appendFileSync(logPath, logEntry);
        return 'Riesgo registrado correctamente';
    }
};
exports.RiskService = RiskService;
exports.RiskService = RiskService = __decorate([
    (0, common_1.Injectable)()
], RiskService);
//# sourceMappingURL=risk.service.js.map