import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './api/auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new RolesGuard());
  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('PORT') ?? 3000);
}
bootstrap();
