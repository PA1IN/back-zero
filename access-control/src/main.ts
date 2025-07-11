import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfg = app.get(ConfigService);
  app.enableCors({
    origin: '*', 
    credentials: true,
  })
  await app.listen(cfg.get('PORT') || 3005);
  console.log(`Servidor control corriendo en ${await app.getUrl()}`);
}
bootstrap();
