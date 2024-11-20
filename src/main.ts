import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { httpsOptions } from './config/https.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: ENV.HTTPS.ENABLE ? httpsOptions : undefined,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(ENV.APP_PORT, () => {
    let LOCAL_DOMAIN = `http://localhost`;

    if (ENV.HTTPS.ENABLE) {
      LOCAL_DOMAIN = `https://${ENV.HTTPS.LOCAL_DOMAIN}`;
    }

    Logger.log(`API Server running on ${LOCAL_DOMAIN}:${ENV.APP_PORT}/api`);
  });
}
bootstrap();
