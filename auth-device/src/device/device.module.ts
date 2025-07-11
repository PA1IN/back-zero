import { Module } from "@nestjs/common";
import { DeviceResolver } from "./device.resolver";
import { DeviceService } from "./device.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceEntity } from "./entity/device.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [
        TypeOrmModule.forFeature([DeviceEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1d'},
            }),}),
        ConfigModule
    ],
    providers:[DeviceResolver, DeviceService]
})
export class DeviceModule{}