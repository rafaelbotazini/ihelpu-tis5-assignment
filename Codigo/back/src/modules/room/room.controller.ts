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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  async listRooms(): Promise<IRoom[]> {
    return await this.roomService.listRooms();
  }

  @Get('/subscribed')
  @UseGuards(AuthGuard('jwt'))
  async listRoomsByUser(@Request() req: GenericRequest): Promise<IRoom[]> {
    return await this.roomService.getRoomByUser(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getRoom(@Param('id') id: string): Promise<IRoom> {
    return await this.roomService.getRoomById(id);
  }

  @Get('search/:query')
  async searchRooms(@Param('query') query: string): Promise<IRoom[]> {
    return await this.roomService.getRoomsByName(query);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createRoom(
    @Request() req: GenericRequest,
    @Body() payload: CreateRoomPayload,
  ): Promise<IRoom> {
    return await this.roomService.createRoom(payload, req.user);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard('jwt'))
  async join(
    @Param('id') id: string,
    @Request() req: GenericRequest,
  ): Promise<IRoom> {
    return await this.roomService.join(id, req.user);
  }

  @Post(':id/leave')
  @UseGuards(AuthGuard('jwt'))
  async leave(
    @Param('id') id: string,
    @Request() req: GenericRequest,
  ): Promise<void> {
    await this.roomService.leave(id, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
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
