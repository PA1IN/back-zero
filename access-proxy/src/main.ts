import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    exposedHeaders: ['x-access-token'],
    allowedHeaders: ['authorization','content-type'],
  });
  await app.listen(3003);
  console.log(`Servidor corriendo... ${await app.getUrl()}`)
}
bootstrap();
