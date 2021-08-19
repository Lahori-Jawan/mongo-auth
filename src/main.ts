import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      // origin // https://github.com/expressjs/cors#configuration-options
    });
  }

  new Logger('main.ts').log(`Application is running on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
