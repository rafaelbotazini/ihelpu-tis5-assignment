import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './models/rooms/room.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/chat-api'),
   RoomsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
