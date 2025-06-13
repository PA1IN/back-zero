import { ProxyService } from "./proxy.service";
export declare class ProxyResolver {
    private readonly proxyService;
    constructor(proxyService: ProxyService);
    proxyRequest(operation: string, variables: string): Promise<unknown>;
    printeo(operation: string, variables: string, context: any): Promise<void>;
}
