"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOllama = runOllama;
exports.askOllama = askOllama;
const ollama_1 = require("ollama");
async function runOllama() {
    const response = await ollama_1.default.chat({
        model: "saki007ster/CybersecurityRiskAnalyst:latest",
        messages: [
            {
                role: "user",
                content: "reponde de forma resumida, ¿Que puedes hacer?, reponde muy resumido",
            },
        ],
        stream: true,
    });
    for await (const part of response) {
        process.stdout.write(part.message.content);
    }
    console.log('');
}
async function askOllama(userMessage) {
    const response = await ollama_1.default.chat({
        model: "saki007ster/CybersecurityRiskAnalyst:latest",
        messages: [
            {
                role: "user",
                content: userMessage,
            },
        ],
        stream: true,
    });
    let fullResponse = "";
    for await (const part of response) {
        fullResponse += part.message.content;
    }
    return fullResponse;
}
//# sourceMappingURL=ollama.js.map