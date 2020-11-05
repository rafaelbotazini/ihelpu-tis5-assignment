import {
  BadRequestException,
  Controller, Get, Param, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IProfile } from 'modules/profile/profile.model';
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
  async getProfile(@Param('roomId') roomId: string): Promise<IMessage[]> {
    const messages = await this.messageService.getMessagesByRoom(roomId);
    if (!roomId) {
      throw new BadRequestException(
        'The messages could not be found.',
      );
    }
    return messages;
  }

}
