import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IRoom } from './room.model';
import { CreateRoomPayload } from './payload/CreateRoomPayload';
import { EditRoomPayload } from './payload/EditRoomPayload';
import { ProfileService } from 'modules/profile/profile.service';
import { IProfile } from 'modules/profile/profile.model';

/**
 * Room Service
 */
@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<IRoom>,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Creates a room in the database
   * @param payload New room info
   * @param adminId The room creator ID
   */
  async createRoom(
    payload: CreateRoomPayload,
    admin: IProfile,
  ): Promise<IRoom> {
    const room = await this.roomModel.create({
      name: payload.name,
      admin: admin._id,
    });
    return room;
  }

  /**
   * Fetch all rooms
   */
  async listRooms(): Promise<IRoom[]> {
    return await this.roomModel.find({}).populate('admin');
  }

  async editRoom(id: string, payload: EditRoomPayload): Promise<void> {
    await this.roomModel.findByIdAndUpdate(id, payload);
  }

  async getRoomById(id: string): Promise<IRoom> {
    const room = await this.roomModel.findById(id).populate('admin');
    return room;
  }

  async join(roomId: string, user: IProfile): Promise<void> {
    const room = await this.getRoomById(roomId);

    await user.populate('groups').execPopulate();
    await room.populate('admin').execPopulate();

    if (!room) {
      throw new NotFoundException(`The room with id  ${roomId} was not found`);
    }

    const isMember = await this.userIsMember(room, user);

    console.log('isMember', isMember);

    if (isMember) {
      return;
    }

    user.groups.push(room);
    room.members.push(user);

    await user.save();
    await room.save();
  }

  userIsMember(room: IRoom, user: IProfile): boolean {
    return (
      user.id === room.admin.id || user.groups.some((r) => r.id === room.id)
    );
  }
}
