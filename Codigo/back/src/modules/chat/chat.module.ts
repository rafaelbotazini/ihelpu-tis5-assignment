import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MessageModule } from 'modules/message/message.module';
import { MessagingModule } from 'modules/messaging/messaging.module';

@Module({
  imports: [MessageModule, MessagingModule],
  providers: [ChatService],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
