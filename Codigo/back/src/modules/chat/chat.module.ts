import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_MQ_CLIENT',
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
      },
    ]),
  ],
  providers: [ChatService],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
