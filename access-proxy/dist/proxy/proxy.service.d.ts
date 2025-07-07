export declare class ProxyService {
    private accessControlUrl;
    forward(query: string, variables?: any): Promise<unknown>;
    forwardAccessControl(query: string): Promise<void>;
}
