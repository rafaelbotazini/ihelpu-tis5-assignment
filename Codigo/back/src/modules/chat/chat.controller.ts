import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('chat')
@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
}
