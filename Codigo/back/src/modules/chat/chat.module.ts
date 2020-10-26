import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigModule } from 'modules/config/config.module';
import { ConfigService } from 'modules/config/config.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'chat_messages',
            type: 'topic',
          },
        ],
        uri: configService.get('RABBITMQ_URL'),
      }),
    }),
  ],
  providers: [ChatService],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
