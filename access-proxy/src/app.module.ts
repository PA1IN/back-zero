import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProxyModule } from './proxy/proxy.module';


@Module({
  imports: [
    ProxyModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), "schema.gql")
    })
  ],
})
export class AppModule {}
