import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { Room } from './room.model';
import { RoomControler } from './room.controller';
import { ProfileModule } from 'modules/profile/profile.module';
import { MessageModule } from 'modules/message/message.module';
import { NotificationModule } from 'modules/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: Room }]),
    ProfileModule,
    MessageModule,
    NotificationModule,
  ],
  providers: [RoomService],
  exports: [RoomService],
  controllers: [RoomControler],
})
export class RoomModule {}
