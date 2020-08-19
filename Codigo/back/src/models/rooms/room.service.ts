import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './interface/room.interface';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async create(room: Room): Promise<Room> {
    const createdRoom = new this.roomModel(room);
    return await createdRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return await this.roomModel.find().exec();
  }

  async findById(id?: string): Promise<Room | null> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return await this.roomModel.findById(id).exec();
    }
  }
}
