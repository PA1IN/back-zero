import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
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
    async login(@Args('loginInput') loginInput: LoginInput) {
        const user = await this.authService.validarUser(
            loginInput.email,
            loginInput.password,
        );
        if(!user){
            throw new Error('Credenciales incorrectas');
        }
        return this.authService.login(user);
    }

    @Mutation(() => LoginResponse)
    async register(@Args('crearUserInput') input: CrearUserInput){
        return this.authService.register(input)
    }
}