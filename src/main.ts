import { NestFactory } from '@nestjs/core';
import { PresentationModule } from './presentation/presentation.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PresentationModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('GATEWAY_PORT'));
}
bootstrap();
