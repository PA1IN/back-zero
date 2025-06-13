import { Module } from "@nestjs/common";
import { DeviceResolver } from "./device.resolver";
import { DeviceService } from "./device.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceEntity } from "./entity/device.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";


@Module({
    imports: [
        TypeOrmModule.forFeature([DeviceEntity]),
        JwtModule.register({}),
        ConfigModule
    ],
    providers:[DeviceResolver, DeviceService]
})
export class DeviceModule{}