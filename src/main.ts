import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //* We can write global level middlewares here
  app.use(Logger)
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
