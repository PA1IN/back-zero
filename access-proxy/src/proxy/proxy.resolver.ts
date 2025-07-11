import { Resolver, Query, Args, Context } from "@nestjs/graphql";
import { ProxyService } from "./proxy.service";
import { gql } from "graphql-request";
import GraphQLJSON from "graphql-type-json";

@Resolver()
export class ProxyResolver{
    
    constructor(private readonly proxyService: ProxyService){}

    @Query(() => GraphQLJSON)
    async proxyRequest(
        @Args('operation') operation: string,
        @Args('variables', { nullable: true }) variables: string,
        @Context() ctx,)
    {
        //console.log("Contexto ___>>>>> ", ctx);

        const {req, res} = ctx;

        //const vars = variables ? JSON.parse(variables) : {};


        //const query = gql`${operation}`;

        const token = req.headers['authorization'] as string | undefined;
        console.log("token", token);
        if(!token)
        {
            throw new Error('header de autorizacion faltante');
        }

        //const upsStream = 'http:// //revisarlo pero mandar peticion a front o a otros microservicios
        
        const resultado = await this.proxyService.forward(
            gql`${operation}`,
            variables ? JSON.parse(variables) : {},
            token,  
        );
        console.log("resultado proxy --->",resultado);

        if(res?.setHeader)
        {
            res.setHeader('x-access-token',token);
            res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
            console.log("enviando token de respuesta al front", token);

        }
        
        
        return resultado;
    }

    @Query(() => String)
    async printeo(
        @Args('operation') operation: string,
        @Args('variables', { nullable: true }) variables: string,
        @Context() context
        ) {
        const req = context.req;
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);
    }
}