import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'chat_messages',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
    }),
  ],
  providers: [ChatService],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
