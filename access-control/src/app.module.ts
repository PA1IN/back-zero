import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AccessControlModule } from './control/control.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    AccessControlModule,
  ],
})
export class AppModule {}
