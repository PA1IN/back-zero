import { Module } from '@nestjs/common';
import { RiskResolver } from './risk.resolver';
import { RiskService } from './risk.service';
import { RiskEntity } from './entity/risk-entiy';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[
    TypeOrmModule.forFeature([RiskEntity])
  ],
  providers: [RiskResolver, RiskService],
})
export class RiskModule {}
