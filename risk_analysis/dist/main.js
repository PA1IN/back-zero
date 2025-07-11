"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const ollama_1 = require("./ollama/ollama");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await (0, ollama_1.runOllama)();
    app.enableCors({
        origin: '*',
        credentials: true
    });
    await app.listen(3006);
}
bootstrap();
//# sourceMappingURL=main.js.map