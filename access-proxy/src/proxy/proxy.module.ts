import { GraphQLBoolean } from "graphql";
import { ProxyResolver } from "./proxy.resolver";
import { ProxyService } from "./proxy.service";
import { Module } from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import { GraphQLModule, GraphQLSchemaHost } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { ApolloDriver } from "@nestjs/apollo";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true}),
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: true,
            resolvers: { JSON: GraphQLJSON},
        }),
    ],
    providers:[ProxyResolver, ProxyService]
})

export class ProxyModule{};