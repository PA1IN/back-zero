import ollama from "ollama";

export async function runOllama(): Promise<void> {
    const response = await ollama.chat({
        model: "saki007ster/CybersecurityRiskAnalyst:latest",
        messages: [
        {
            role: "user",
            content: "reponde de forma resumida, ¿Que puedes hacer?, reponde muy resumido",
        },
        ],
        stream: true,
    });

    //console.log('>>')
    for await (const part of response) {
        //console.log('>>', JSON.stringify(part));
        process.stdout.write(part.message.content); 
    }
    console.log('')
}

export async function askOllama(userMessage: string): Promise<string> {
    const response = await ollama.chat({
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
