import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { IRoom } from './room.model';
import { CreateRoomPayload } from './payload/CreateRoomPayload';
import { EditRoomPayload } from './payload/EditRoomPayload';
import GenericRequest from 'common/interfaces/GenericRequest';

/**
 * Room Controller
 */
@ApiBearerAuth()
@ApiTags('room')
@Controller('api/room')
export class RoomControler {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Rooms Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Rooms Request Failed' })
  async listRooms(): Promise<IRoom[]> {
    return await this.roomService.listRooms();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Rooms Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Rooms Request Failed' })
  async getRoom(@Param('id') id: string): Promise<IRoom> {
    return await this.roomService.getRoomById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'Create Room Request Received' })
  @ApiResponse({ status: 400, description: 'Create Room Request Failed' })
  async createRoom(
    @Request() req: GenericRequest,
    @Body() payload: CreateRoomPayload,
  ): Promise<IRoom> {
    return await this.roomService.createRoom(payload, req.user);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Join Room Request Received' })
  @ApiResponse({ status: 400, description: 'Join Room Request Failed' })
  async join(
    @Param('id') id: string,
    @Request() req: GenericRequest,
  ): Promise<void> {
    await this.roomService.join(id, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Rooms Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Rooms Request Failed' })
  async editRoom(
    @Param('id') id: string,
    @Request() req: GenericRequest,
    @Body() payload: EditRoomPayload,
  ): Promise<void> {
    const room = await this.roomService.getRoomById(id);

    if (room.admin.id !== req.user.id) {
      throw new ForbiddenException();
    }

    return await this.roomService.editRoom(id, payload);
  }
}
