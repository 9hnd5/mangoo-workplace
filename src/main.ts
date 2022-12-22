import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { default as Redis } from 'ioredis';
import { AppModule } from './app.module';
export const redis = new Redis(6379);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));
  await app.listen(3003);
}
bootstrap();
