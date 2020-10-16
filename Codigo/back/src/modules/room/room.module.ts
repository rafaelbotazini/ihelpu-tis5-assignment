import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room } from './room.model';
import { RoomControler } from './room.controller';
import { ProfileModule } from 'modules/profile/profile.module';

@Module({
  imports: [
    ProfileModule,
    MongooseModule.forFeature([{ name: 'Room', schema: Room }]),
  ],
  providers: [RoomService],
  exports: [RoomService],
  controllers: [RoomControler],
})
export class RoomModule {}
