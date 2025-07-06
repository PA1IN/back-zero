import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runOllama } from './ollama/ollama';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await runOllama();
  await app.listen(3006);
}
bootstrap();
