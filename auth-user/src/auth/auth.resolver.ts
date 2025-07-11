import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CrearUserInput } from './dto/crear-user.input';
import { LoginResponse } from './dto/login-response.dto';
import { TokenCheck } from './dto/token-check';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService, private readonly jwtService: JwtService, private readonly usersService: UsersService){}

    @Query(() => String)
    hello(){
        return 'graphql authUser';
    }

    @Mutation(()=> LoginResponse)
    async login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
        const user = await this.authService.validarUser(
            loginInput.email,
            loginInput.password,
        );
        if(!user){
            throw new Error('Credenciales incorrectas');
        }
        
        const ip = context.req.socket.remoteAddress;
        console.log("ip--->", ip);

        return this.authService.login(loginInput, ip);
    }

    @Mutation(() => LoginResponse) //Esta funcion hace la mayor parte del trabajo
    //trabaja con todos los datos, el context solo sirve para extraer el ip
    async register(@Args('crearUserInput') input: CrearUserInput, @Context() context){
        const ipRemote = context.req.socket.remoteAddress;
        console.log("aaaaaaa -->>", ipRemote);
        return this.authService.register(input, ipRemote);
    }


    @Query(() => TokenCheck)
    async validateToken(@Args('token') token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findById(payload.sub);
            return { ok: !!user, userId: user?.id || null};
        } catch {
            return { ok:false, userId: null};
        }
    }
}