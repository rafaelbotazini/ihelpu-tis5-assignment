import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigModule } from 'modules/config/config.module';
import { ConfigService } from 'modules/config/config.service';
import { MessageModule } from 'modules/message/message.module';
import { CHAT_MESSAGES } from 'common/constants/exchanges';

@Module({
  imports: [
    MessageModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: CHAT_MESSAGES,
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
