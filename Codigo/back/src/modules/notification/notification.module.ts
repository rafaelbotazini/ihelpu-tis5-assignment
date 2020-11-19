import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from 'modules/config/config.module';
import { ConfigService } from 'modules/config/config.service';
import { NotificationService } from './notification.service';
import { ROOM_UPDATES } from 'common/constants/exchanges';

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
        ],
        uri: configService.get('RABBITMQ_URL'),
      }),
    }),
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
