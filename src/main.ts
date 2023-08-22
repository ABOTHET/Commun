import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { env } from "process";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const PORT = env["PORT"] || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.use(cookieParser());
  await app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}

bootstrap();
