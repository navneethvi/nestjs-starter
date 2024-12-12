import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //* We can write global level middlewares here
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
