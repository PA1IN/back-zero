import { ConfigService } from "@nestjs/config";
export declare class ProxyService {
    private readonly cfg;
    private readonly accessControlUrl;
    constructor(cfg: ConfigService);
    checkAccess(token: string): Promise<boolean>;
    forward(query: string, variables: any, token: string): Promise<unknown>;
}
