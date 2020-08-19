import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomController } from './room.controller';
import { RoomsService } from './room.service';
import { RoomSchema } from './schemas/room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [RoomsService],
  exports: [RoomsService], 
})
export class RoomsModule {}

