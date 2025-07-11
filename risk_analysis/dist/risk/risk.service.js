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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
const risk_entiy_1 = require("./entity/risk-entiy");
const ollama_1 = require("../ollama/ollama");
let RiskService = class RiskService {
    riskRepository;
    constructor(riskRepository) {
        this.riskRepository = riskRepository;
    }
    ;
    async registrarRiesgo(data) {
        const { ip, operatingSystem, userId, email, deviceId, timeZone } = data;
        const timestamp = new Date().toISOString();
        const historial = await this.riskRepository.find({
            where: { user_id: userId },
            order: { timestamp: 'DESC' },
            take: 200,
        });
        const historialTexto = historial.map(r => `${r.ip},${r.operating_system},${r.user_id},${r.email},${r.device_id},${r.time_zone},${r.timestamp}`).join('\n');
        const entradaActual = `${ip},${operatingSystem},${userId},${email},${deviceId},${timeZone}`;
        const prompt = `
    Eres un analista de ciberseguridad. A continuación se te entrega el historial de actividad de un usuario, seguido por una nueva entrada. 
    Tu tarea es detectar si hay alguna anomalía o cambio significativo en la nueva entrada comparado con el historial. 
    Si todo está bien, responde "Sin anomalías". Si hay algo sospechoso, genera un breve reporte de riesgo.

    Historial del usuario:
    ${historialTexto}

    Nueva entrada:
    ${entradaActual}

    Analiza y responde:
    `;
        const analisis = await (0, ollama_1.askOllama)(prompt);
        const logEntry = `[${timestamp}] ${entradaActual} | Análisis: ${analisis.trim()}\n`;
        const logDir = path.join(__dirname, '..', 'logs');
        const logPath = path.join(logDir, 'risk.log');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        fs.appendFileSync(logPath, logEntry);
        await this.riskRepository.save({
            ip,
            operating_system: operatingSystem,
            user_id: userId,
            email,
            device_id: parseInt(deviceId, 10),
            time_zone: timeZone,
            timestamp,
            risk_level_ia: analisis.trim() || 'Nivel de riesgo no definido',
        });
        const datos = {
            ip,
            operating_system: operatingSystem,
            user_id: userId,
            email,
            device_id: parseInt(deviceId, 10),
            time_zone: timeZone,
            timestamp,
            risk_level_ia: analisis
        };
        console.clear();
        console.log("analisis de riesgo ---->", analisis);
        return 'Riesgo registrado y analizado correctamente';
    }
};
exports.RiskService = RiskService;
exports.RiskService = RiskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(risk_entiy_1.RiskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RiskService);
//# sourceMappingURL=risk.service.js.map