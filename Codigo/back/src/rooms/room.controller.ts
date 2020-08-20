import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Req,
  Res,
} from '@nestjs/common';

import { Response, Request } from 'express';

import { Room } from './schemas/room.schema';
import { RoomsService, CreateRoomDto } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(): Promise<Room[]> {
    return await this.roomsService.findAll();
  }

  @Post()
  async create(@Body() body: CreateRoomDto): Promise<Room> {
    return await this.roomsService.create({ nome: body.nome });
  }

  @Get(':id')
  async show(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { id } = req.params;

    const room = await this.roomsService.findById(id);

    if (!room) {
      return res
        .status(404)
        .json({ error: `A sala com o id: ${id} não existe` });
    }

    return res.json(room);
  }

  @Put(':id')
  async update(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome } = req.body;

    await this.roomsService.update(id, { nome });

    return res.send();
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Res() res: Response): Promise<Response> {
    await this.roomsService.delete(req.params.id);
    return res.send();
  }
}
