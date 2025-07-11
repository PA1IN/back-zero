import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*"
  });
  
  await app.listen(3004);
  console.log(`servidor corriendo en...${await app.getUrl()}`);
  
}
bootstrap();
