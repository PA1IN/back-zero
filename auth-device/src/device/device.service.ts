import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { DeviceResponse } from "./dto/device-login-responce.dto";
import { DeviceLogin } from "./dto/device-login.dto";
import { InjectRepository } from '@nestjs/typeorm'
import { DeviceEntity } from "./entity/device.entity";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";


@Injectable()
export class DeviceService{

    constructor(
        @InjectRepository(DeviceEntity)
        private readonly deviceRepository: Repository<DeviceEntity>,
        private readonly configService: ConfigService,
    ){}

    

    async loginDevice({device}: DeviceLogin, token: string){
        //En esta funcion recibo 2 valores, el token (que es del auth user) y el device (que es el id del device)
        const secret = this.configService.get<string>('JWT_SECRET');
        if(!secret){
            throw new Error("La variable de entorno Secret no esta definida");
        }

        try {
        // Verifica el token y extrae los datos
        const tokenSinPrefijo = token.replace(/^Bearer\s+/i, '');
        const decodedToken = jwt.verify(tokenSinPrefijo, secret) as any; 
        
        // Verifica si el usuario ya tiene dispositivos registrados
        const existingDevice = await this.deviceRepository.findOne({
            where: { user_id: decodedToken.userId, device_id: decodedToken.deviceId }
        });

        const existDevice = existingDevice;

        if (!existDevice) {
            // Si no esta el usuario no se da acceso
            throw new Error('El Usuario no está autorizado.');
        }

        if(existDevice.device_id !== device){
            //Si no coincide el device id no se da acceso
            console.log("id del dispositivo local", existDevice.device_id);
            console.log("id del dispositivo desde fuera", device);
            throw new Error("El dispositivo no pertenece al usuario");
        }

        // Si el dispositivo coincide, se le da acceso
        console.log("xxxx-->",decodedToken.userId );
        console.log("XXXX-->",decodedToken.deviceId);
        console.log("XXXXL", device);

        // modificamos el token para crear uno nuevo
        const newPayload = {
            deviceId: device,
            userId: decodedToken.userId,
            email: decodedToken.email,
            navigator: decodedToken.navigator,
            operatingSystem: decodedToken.operatingSystem,
            zone: decodedToken.zone,
            ip: decodedToken.ip,
            time: decodedToken.time,
        };

        console.log("***********",newPayload);

        const signedToken = jwt.sign(newPayload, secret, { expiresIn: '1d' });

        return {
            success: true,
            token: signedToken,
        } as DeviceResponse;
        
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError)
            {
                throw new Error('Token inválido o sesión expirada.');
            }
            throw error;
        }
    }


    async registerDevice(userId: number, ip: string, operatingSystem: string){
        
        const deviceUser = this.deviceRepository.findOne({where:{
            user_id: userId,
        }});

        if(!deviceUser){
            return BadRequestException;
        };

        const idUnico = generarIdSeisDigitos();

        const userDevice = this.deviceRepository.create({user_id: userId, device_id: String(idUnico), ip: ip, operating_system: operatingSystem});

        this.deviceRepository.save(userDevice);

        return idUnico;
    }

    async deviceToUser(userId: number, deviceId: string): Promise<boolean> {
        const device = await this.deviceRepository.findOne({
            where: { user_id: userId, device_id: deviceId},
        });
        return !!device;
    }
}

function generarIdSeisDigitos(): number {
    return Math.floor(100000 + Math.random() * 900000);
}