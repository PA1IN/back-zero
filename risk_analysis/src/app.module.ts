import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RiskModule } from './risk/risk.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3310,
      username: "risk_user",
      password: "root",
      database: "riskDB",
      autoLoadEntities: true,
      synchronize: true
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: true, 
    }),
    RiskModule,
  ],
})
export class AppModule {}
