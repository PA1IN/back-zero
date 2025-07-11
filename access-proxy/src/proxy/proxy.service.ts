import { Injectable } from "@nestjs/common";
import { request} from "graphql-request";
import { gql, GraphQLClient } from "graphql-request";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";

interface TokenPayload {
    deviceId: string;
    userId: number;
    email: string;
    navigator: string;
    operatingSystem: string;
    zone: string;
    ip: string;
    time: string;
}


@Injectable()
export class ProxyService{
    private readonly accessControlUrl: string;

    constructor( private readonly cfg: ConfigService)
    {
        this.accessControlUrl =  'http://192.168.1.5:3005/graphql';
    }

    //private accessControlUrl = 'http://access-control-service/graphql'; //Esta es la direccion de peticiones a access control
    async checkAccess(token:string): Promise<boolean>
    {
        const tokenSinPrefijo = token.replace(/^Bearer\s+/i, '');   
        const payload = jwt.decode(tokenSinPrefijo) as TokenPayload | null;
        console.log("payload token",payload)
        if(!payload?.deviceId)
        {
            throw new Error('no esta deviceId en el token');
        }

        const query = gql`
            mutation($deviceId: String!){
                verifyAccess(input: { deviceId: $deviceId})
            }`;
        
        const client = new GraphQLClient(this.accessControlUrl, {
            headers: { authorization: token },
        });

        const { verifyAccess } = await client.request<{verifyAccess: boolean}>(
            query,
            {
                deviceId: payload.deviceId
            },
        );
        console.log(verifyAccess);
        return verifyAccess;

    }


    /*async forward( query: string, variables?: any)
    {
        try {
            const data = await request(this.accessControlUrl, query, variables);
            return data;
        } catch (error) {
            console.error('Error al reenviar la request:', error);
            throw error;
        }
    }*/



     async forward( query: string, variables: any, token: string)
    {
        try {
            const respuesta = await this.checkAccess(token);
            console.log("booleano de forward --->", respuesta);
        
            if(!respuesta)
            {
                throw new Error('respuesta denegada por el access control');
            }

            const client = new GraphQLClient(this.accessControlUrl, {
                headers: { authorization: token },
            });

            return client.request(query, variables);
        } catch (error) {
            console.error('Error al reenviar la request:', error);
            throw error;
        }
    }
}