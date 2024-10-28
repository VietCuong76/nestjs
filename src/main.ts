import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

interface Local {
  name: string;
  age: number;
}

interface Local1 extends Local {
  city: string;
}

async function bootstrap() {
  const local: Local1 = {
    name: 'John Doe',
    age: 30,
    city: 'New York',
  };
  const fn = (a: number, b: number): number => a + b;

  fn(1, 2);

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
