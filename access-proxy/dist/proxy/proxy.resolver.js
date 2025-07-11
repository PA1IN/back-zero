"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const proxy_service_1 = require("./proxy.service");
const graphql_request_1 = require("graphql-request");
const graphql_type_json_1 = require("graphql-type-json");
let ProxyResolver = class ProxyResolver {
    proxyService;
    constructor(proxyService) {
        this.proxyService = proxyService;
    }
    async proxyRequest(operation, variables, ctx) {
        const { req, res } = ctx;
        const token = req.headers['authorization'];
        console.log("token", token);
        if (!token) {
            throw new Error('header de autorizacion faltante');
        }
        const resultado = await this.proxyService.forward((0, graphql_request_1.gql) `${operation}`, variables ? JSON.parse(variables) : {}, token);
        console.log("resultado proxy --->", resultado);
        if (res?.setHeader) {
            res.setHeader('x-access-token', token);
            res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
            console.log("enviando token de respuesta al front", token);
        }
        return resultado;
    }
    async printeo(operation, variables, context) {
        const req = context.req;
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);
    }
};
exports.ProxyResolver = ProxyResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.default),
    __param(0, (0, graphql_1.Args)('operation')),
    __param(1, (0, graphql_1.Args)('variables', { nullable: true })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProxyResolver.prototype, "proxyRequest", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('operation')),
    __param(1, (0, graphql_1.Args)('variables', { nullable: true })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProxyResolver.prototype, "printeo", null);
exports.ProxyResolver = ProxyResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [proxy_service_1.ProxyService])
], ProxyResolver);
//# sourceMappingURL=proxy.resolver.js.map