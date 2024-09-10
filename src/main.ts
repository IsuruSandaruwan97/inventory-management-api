import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: false,
    transformOptions: {
      exposeUnsetFields: false
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(helmet())
  const options = new DocumentBuilder()
    .addBearerAuth().addSecurityRequirements('bearer')
    .setTitle('Nest-js Swagger Inventory Management API')
    .setDescription('Swagger API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  }); 
  await app.listen(parseInt(process.env?.PORT)||3000);
}

bootstrap();
