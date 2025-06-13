import { ProxyResolver } from "./proxy.resolver";
import { ProxyService } from "./proxy.service";
import { Module } from "@nestjs/common";

@Module({
    providers:[ProxyResolver, ProxyService]
})

export class ProxyModule{};