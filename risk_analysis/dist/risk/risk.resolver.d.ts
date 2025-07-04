import { RiskService } from './risk.service';
import { RiskInput } from './dto/risk-input.dto';
export declare class RiskResolver {
    private readonly riskService;
    constructor(riskService: RiskService);
    analyzeAccessRisk(input: RiskInput): Promise<string>;
    ping(): string;
}
