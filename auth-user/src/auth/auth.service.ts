import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService} from '../users/users.service';
import { CrearUserInput} from './dto/crear-user.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom} from 'rxjs';
import { User } from '../users/entities/user.entity';
import { LoginResponse } from './dto/login-response.dto';
import { syncUserDevice } from 'src/request/request.graphql';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private httpService: HttpService,
    ){}


    async validarUser(email: string, password: string): Promise<Omit<User,'password'> | null> {
        const user: User | null = await this.usersService.findByEmail(email);
        if(user && await bcrypt.compare(password, user.password)){
            const { password, ...result } = user;
            return result as Omit<User, 'password'>;
        }
        return null;
    }

    async login(loginInput: LoginInput, ip: string): Promise<LoginResponse>{

        //Se genera el token con los datos recibidos para que access control lo compara con lo que hay en base de datos;
        //const user = await this.usersService.findByEmail(loginInput.email);
        const user = await this.usersService.findByEmail(loginInput.email);

        if(!user){
            throw new Error("Usuario no registrado");
        }

        try{
            const payload = {
                userId : user.id,
                email: loginInput.email, 
                navigator: loginInput.navigator, 
                zone: loginInput.zone, 
                //idDevice: loginInput.idDevice, lo saque porque es el login del user, no es necesario aun el id del dispositivo
                operatingSystem: loginInput.operatingSystem,
                ip: ip,
                time: loginInput.time
            }
            const token = this.jwtService.sign(payload);
            return {token: token} as LoginResponse;
        } catch (error) {
            //console.warn('no se ha podido notificar al Riskanalysis:', error);
        }
        throw new Error("No es posible generar el token");
    }

    async register(input: CrearUserInput, ip: string): Promise<LoginResponse>{
        const existe = await this.usersService.findByEmail(input.email);
        if(existe){
            throw new Error('El usuario ya existe')
        }

        const passwordHasheada: string = await bcrypt.hash(input.password, 10);
        const user = await this.usersService.create({
            email: input.email,
            password: passwordHasheada,
            role: 'user',
            navigator: input.navigator,
            zone: input.timeZone
        });

        ///############################################################################ Request a Device
        try {
            const result = await syncUserDevice(user.id, ip, input.operatingSystem);
            console.log('Resultado de syncUserDevice:', result); // debería imprimir el id del dispositivo
            const tokenUser = this.jwtService.sign(user);
            return ({token: tokenUser, idDevice: result}) as LoginResponse;
        } catch (error) {
            console.warn('Error al sincronizar con auth-device:', error);
        }

        throw new Error("No se genero el token");
    }
}