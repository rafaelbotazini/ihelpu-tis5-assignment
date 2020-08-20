import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schemas/room.schema';

export type CreateRoomDto = Pick<Room, 'nome'>;
export type UpdateRoomDto = Pick<Room, 'nome'>;

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async create(room: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(room);
    await createdRoom.save();
    return createdRoom;
  }

  async findAll(): Promise<Room[]> {
    return await this.roomModel.find();
  }

  async findById(id?: string): Promise<Room> {
    const room = await this.roomModel.findById(id);

    if (!room) {
      return null;
    }

    return room;
  }

  async update(id: string, update: UpdateRoomDto): Promise<void> {
    await this.roomModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string): Promise<void> {
    await this.roomModel.findByIdAndDelete(id);
  }
}
