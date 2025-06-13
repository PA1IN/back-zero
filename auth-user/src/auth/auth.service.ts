import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService} from '../users/users.service';
import { CrearUserInput} from './dto/crear-user.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom} from 'rxjs';
import { User } from '../users/entities/user.entity';
import { LoginResponse } from './dto/login-response.dto';

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

    async login(user: Omit<User, 'password'>): Promise<LoginResponse>{
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        try{
            const url = process.env.RISK_ANALYSIS_URL;
            if(url){
                await firstValueFrom(
                    this.httpService.post(url, {
                        userId: user.id,
                        action: 'login_success',
                        timestamp: new Date().toISOString(),
                    })
                );
            }
                
        } catch (error) {
            console.warn('no se ha podido notificar al Riskanalysis:', error);
        }
        return {token: token} as LoginResponse;
    }

    async register(input: CrearUserInput): Promise<LoginResponse>{
        const existe = await this.usersService.findByEmail(input.email);
        if(existe){
            throw new Error('El usuario ya existe')
        }

        const passwordHasheada: string = await bcrypt.hash(input.password, 10);
        const user = await this.usersService.create({
            email: input.email,
            password: passwordHasheada,
            role: 'user',
        });

        return this.login(user);
    }
}