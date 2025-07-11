import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { DeviceService } from "./device.service";
import { DeviceResponse } from "./dto/device-login-responce.dto";
import { DeviceLogin } from "./dto/device-login.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Resolver()
export class DeviceResolver{
    constructor(private readonly deviceService: DeviceService, private readonly jwtService: JwtService, private readonly configService: ConfigService,
    ){}
    @Query(() => String)
    dummyQuery():String{
        return 'hola del resolver';
    }

    @Mutation(returns => DeviceResponse)
    loginDevice(@Args('loginDto') loginDto : DeviceLogin, @Context() context): Promise<DeviceResponse>{
        const token = this.extractTokenFromHeader(context.req);
        if (!token) {
        throw new Error('No se encontró el token de autorización');
    }
        return this.deviceService.loginDevice(loginDto, token);
    }

    @Mutation(returns => Number)
    syncUserDevice(@Args('userId') userId: number, @Args('ipDevice') ipDevice: string, @Args('operatingSystem') operatingSystem: string){
        return this.deviceService.registerDevice(userId, ipDevice, operatingSystem);
    }

    @Query(() => String)
    obtenerMiIp(@Context() context): string{
        console.log(context);
        console.log('IP del cliente:', context.req.socket.remoteAddress);

        return context;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return undefined;
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return undefined;
        }
        return token;
    }


    @Query(() => Boolean)
    verifyDevice(
        @Args('token') token: string,
        @Args('deviceId') deviceId: string,
        @Args('userId') userId: number,
    ) {
        console.log("token recibido --->", token);
        const tokenSinPrefijo = token.replace(/^Bearer\s+/i, '');
        const header = JSON.parse(Buffer.from(token.split('.')[0], 'base64url').toString());
        console.log('ALG en el header:', header.alg);
        console.log('secret: ', this.configService.get('JWT_SECRET'));

        const payload = this.jwtService.verify(tokenSinPrefijo, {secret: this.configService.get<string>('JWT_SECRET'), algorithms: [header.alg],});
        if(payload.userId !== userId)
        {
            return false;
        }

        return this.deviceService.deviceToUser(userId, deviceId);
    }
}