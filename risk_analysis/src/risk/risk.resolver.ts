import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { RiskService } from './risk.service';
import { RiskInput } from './dto/risk-input.dto';

@Resolver()
export class RiskResolver {
  constructor(private readonly riskService: RiskService) {}

  @Mutation(() => String)
  async analyzeAccessRisk(@Args('input') input: RiskInput): Promise<string> {
    //console.log("datos de control", input);
    return this.riskService.registrarRiesgo(input);
  }

  @Query(() => String)
  ping(): string {
    return 'Risk Analysis Service is running';
  }
}
