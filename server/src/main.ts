import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  };
  app.enableCors(corsOptions);

  // Start the NestJS application on port 4000
  await app.listen(4000);
}

bootstrap();