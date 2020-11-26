import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CHAT_MESSAGES, ROOM_UPDATES } from 'common/constants/exchanges';
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
            name: ROOM_UPDATES,
            type: 'topic',
          },
          {
            name: CHAT_MESSAGES,
            type: 'topic',
          },
        ],
        uri: configService.get('RABBITMQ_URL'),
      }),
    }),
  ],
  exports: [RabbitMQModule],
})
export class MessagingModule {}
