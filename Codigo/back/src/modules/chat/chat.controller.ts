import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('chat')
@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {
    chatService.sendTextMessage('1', 'Mensagem para a sala 1', 'USER1');
  }
}
