import { Module } from '@nestjs/common';
import { RiskResolver } from './risk.resolver';
import { RiskService } from './risk.service';

@Module({
  providers: [RiskResolver, RiskService],
})
export class RiskModule {}
