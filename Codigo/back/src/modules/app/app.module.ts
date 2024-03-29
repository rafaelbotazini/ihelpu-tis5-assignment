import * as winston from 'winston';
import * as rotateFile from 'winston-daily-rotate-file';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { WinstonModule } from '../winston/winston.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { RoomModule } from 'modules/room/room.module';
import { ChatModule } from 'modules/chat/chat.module';
import { NotificationModule } from 'modules/notification/notification.module';
import { MessageModule } from 'modules/message/message.module';
import { MessagingModule } from 'modules/messaging/messaging.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.isEnv('dev')
          ? {
              level: 'info',
              format: winston.format.json(),
              defaultMeta: { service: 'user-service' },
              transports: [
                new winston.transports.Console({
                  format: winston.format.simple(),
                }),
              ],
            }
          : {
              level: 'info',
              format: winston.format.json(),
              defaultMeta: { service: 'user-service' },
              transports: [
                new winston.transports.File({
                  filename: 'logs/error.log',
                  level: 'error',
                }),
                new winston.transports.Console({
                  format: winston.format.simple(),
                }),
                new rotateFile({
                  filename: 'logs/application-%DATE%.log',
                  datePattern: 'YYYY-MM-DD',
                  zippedArchive: true,
                  maxSize: '20m',
                  maxFiles: '14d',
                }),
              ],
            };
      },
    }),
    AccessControlModule.forRoles(roles),
    ConfigModule,
    AuthModule,
    ChatModule,
    ProfileModule,
    RoomModule,
    NotificationModule,
    MessageModule,
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
