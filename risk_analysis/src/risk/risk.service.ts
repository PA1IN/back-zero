import { Injectable } from '@nestjs/common';
import { RiskInput } from './dto/risk-input.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RiskService {
  async registrarRiesgo(data: RiskInput): Promise<string> {
    const { ip, operatingSystem, userId, email, deviceId, timeZone } = data;

    const riesgo = `${ip},${operatingSystem},${userId},${email},${deviceId},${timeZone}`;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${riesgo}\n`;

    const logDir = path.join(__dirname, '..', 'logs');
    const logPath = path.join(logDir, 'risk.log');

    // Crear carpeta si no existe
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    // Agregar la línea al archivo
    fs.appendFileSync(logPath, logEntry);

    return 'Riesgo registrado correctamente';
  }
}
