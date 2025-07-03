import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CrearUserInput } from './dto/crear-user.input';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

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

        return this.authService.login(loginInput, ip);
    }

    @Mutation(() => LoginResponse) //Esta funcion hace la mayor parte del trabajo
    //trabaja con todos los datos, el context solo sirve para extraer el ip
    async register(@Args('crearUserInput') input: CrearUserInput, @Context() context){
        const ipRemote = context.req.socket.remoteAddress;
        return this.authService.register(input, ipRemote);
    }
}