import { RiskInput } from './dto/risk-input.dto';
import { Repository } from 'typeorm';
import { RiskEntity } from './entity/risk-entiy';
export declare class RiskService {
    private readonly riskRepository;
    constructor(riskRepository: Repository<RiskEntity>);
    registrarRiesgo(data: RiskInput): Promise<string>;
}
