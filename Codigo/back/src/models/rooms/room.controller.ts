import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Request,
  Response,
} from '@nestjs/common';

import { RoomsService } from './room.service';
import { Room } from './interface/room.interface';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(): Promise<Room[]> {
    return await this.roomsService.findAll();
  }

  @Post()
  async create(@Body() body: Room): Promise<Room> {
    const room = await this.roomsService.create(body);
    return room;
  }

  @Get(':id')
  async show(@Request() req, @Response() res): Promise<Room> {
    const id = req.params.id;

    if (!id) {
      return res.json({ error: 'ID Room not found' });
    }

    const room = await this.roomsService.findById(id);
    if (!room) {
      return res.json({ error: `A sala com o id: ${id} não existe` });
    }

    return room;
  }
}
