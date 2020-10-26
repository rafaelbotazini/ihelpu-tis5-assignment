import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('chat')
@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {
    chatService.sendMessage('1', 'Mensagem para a sala 1', 'USER1');
  }

  @MessagePattern('chats_queue')
  public async getNotifications(
    @Payload() data: string,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(context.getMessage());
    console.log(context.getPattern());
    this.chatService.printMessage(`Recebido: ${data}}`);
  }

  // @Get('/:roomId')
  // public async listen(@Param('roomId') roomId: string): Promise<string> {
  //   return '';
  // }
}
