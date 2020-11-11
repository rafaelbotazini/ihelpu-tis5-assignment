import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IMessage } from './message.model';
import { MessageService } from './message.service';

/**
 * Message Controller
 */
@ApiBearerAuth()
@ApiTags('message')
@Controller('api/message')
export class MessageController {
  /**
   * Constructor
   * @param messageService
   */
  constructor(private readonly messageService: MessageService) {}

  @Get(':roomId')
  @ApiResponse({ status: 200, description: 'Message Request Received' })
  @ApiResponse({ status: 400, description: 'Message Request Failed' })
  async get(@Param('roomId') roomId: string): Promise<IMessage[]> {
    const messages = await this.messageService.getMessagesByRoom(roomId);
    return messages;
  }

  @Get(':roomId/before/:date')
  async getAll(
    @Param('roomId') roomId: string,
    @Param('date') date: string,
  ): Promise<IMessage[]> {
    return this.messageService.getMessagesBeforeDate(roomId, date);
  }
}
