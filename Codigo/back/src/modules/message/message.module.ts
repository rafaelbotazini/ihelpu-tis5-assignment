import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './message.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: Message }])],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
