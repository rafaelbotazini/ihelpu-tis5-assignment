import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './message.model';
import { MessageController } from './message.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: Message }])],
  providers: [MessageService],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
