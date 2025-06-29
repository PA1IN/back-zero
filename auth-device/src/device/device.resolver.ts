import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { DeviceService } from "./device.service";
import { DeviceResponse } from "./dto/device-login-responce.dto";
import { DeviceLogin } from "./dto/device-login.dto";


@Resolver()
export class DeviceResolver{
    constructor(private readonly deviceService: DeviceService){}
    @Query(() => String)
    dummyQuery():String{
        return this.deviceService.hola();
    }

    @Mutation(returns => DeviceResponse)
    loginDevice(@Args('loginDto') loginDto : DeviceLogin, @Context() context): Promise<DeviceResponse>{
        const token = this.extractTokenFromHeader(context);
        if (!token) {
        throw new Error('No se encontró el token de autorización');
    }
        return this.deviceService.loginDevice(loginDto, token);
    }

    @Mutation(returns => Number)
    syncUserDevice(@Args('userId') userId : number, @Context() context){
        return this.deviceService.registerDevice(userId, context.req.socket.remoteAddress);
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
}