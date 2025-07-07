import { Injectable } from "@nestjs/common";
import { request} from "graphql-request";

@Injectable()
export class ProxyService{

    private accessControlUrl = 'http://access-control-service/graphql'; //Esta es la direccion de peticiones a access control

    async forward( query: string, variables?: any){
        try {
            const data = await request(this.accessControlUrl, query, variables);
            return data;
        } catch (error) {
            console.error('Error al reenviar la request:', error);
            throw error;
        }
    }

    async forwardAccessControl(query: string){
        
    }
}