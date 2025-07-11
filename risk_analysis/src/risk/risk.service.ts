import { Injectable } from '@nestjs/common';
import { RiskInput } from './dto/risk-input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { RiskEntity } from './entity/risk-entiy';
import { askOllama } from 'src/ollama/ollama';

@Injectable()
export class RiskService {

  constructor (
    @InjectRepository(RiskEntity)
    private readonly riskRepository: Repository<RiskEntity>
  ){};
  async registrarRiesgo(data: RiskInput): Promise<string> {
    const { ip, operatingSystem, userId, email, deviceId, timeZone } = data;
    const timestamp = new Date().toISOString();
    


    //console.log("datos del control", data);
      // Buscar historial del usuario (máximo 200 entradas)
    const historial = await this.riskRepository.find({
      where: { user_id: userId },
      order: { timestamp: 'DESC' },
      take: 200,
    });

    const historialTexto = historial.map(r => 
      `${r.ip},${r.operating_system},${r.user_id},${r.email},${r.device_id},${r.time_zone},${r.timestamp}`
      ).join('\n');


    //Entrada que se acaba de recibir
    const entradaActual = `${ip},${operatingSystem},${userId},${email},${deviceId},${timeZone}`;
    //console.log(entradaActual);
     // Prompt para la IA
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

    //console.log(prompt)


    // Obtener respuesta de la IA
    const analisis = await askOllama(prompt);

    const logEntry = `[${timestamp}] ${entradaActual} | Análisis: ${analisis.trim()}\n`;

    // Guardar en archivo
    const logDir = path.join(__dirname, '..', 'logs');
    const logPath = path.join(logDir, 'risk.log');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    fs.appendFileSync(logPath, logEntry);

    
    await this.riskRepository.save({
      ip,
      operating_system: operatingSystem,
      user_id:userId,
      email,
      device_id:parseInt(deviceId,10),
      time_zone:timeZone,
      timestamp,
      risk_level_ia: analisis.trim() || 'Nivel de riesgo no definido',
    })

    const datos = {
      ip,
      operating_system: operatingSystem,
      user_id:userId,
      email,
      device_id:parseInt(deviceId,10),
      time_zone:timeZone,
      timestamp,
      risk_level_ia: analisis

    }
    console.clear();
    console.log("analisis de riesgo ---->", analisis);

    return 'Riesgo registrado y analizado correctamente';
  }
}
