import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Transport } from '@nestjs/microservices';
import * as headers from 'fastify-helmet';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * The url endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT = 'api/docs';
/**
 * The name of the api
 * @type {string}
 */
export const SWAGGER_API_NAME = 'API';
/**
 * A short description of the api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = 'API Description';
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = '1.0';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.connectMicroservice({
    name: 'CHAT_MQ_SERVICE_PROVIDER',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      // urls: [
      //   'amqps://elqpxlad:jAgQ_Y2iuiR0HXlvF-RWcEXm7wSbPI8t@jackal.rmq.cloudamqp.com/elqpxlad',
      // ],
      queue: 'chats_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  app.register(headers, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // app.register(fastifyRateLimiter, {
  //   max: 100,
  //   timeWindow: '1 minute',
  // });
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservicesAsync();
  await app.listen(Number(process.env.PORT) || 9000, '0.0.0.0');
})();
