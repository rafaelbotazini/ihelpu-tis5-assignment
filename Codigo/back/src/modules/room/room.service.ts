import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IRoom } from './room.model';
import { CreateRoomPayload } from './payload/CreateRoomPayload';
import { EditRoomPayload } from './payload/EditRoomPayload';
import { ProfileService } from 'modules/profile/profile.service';
import { IProfile } from 'modules/profile/profile.model';
import { MessageService } from 'modules/message/message.service';
import { IMessage } from 'modules/message/message.model';

/**
 * Room Service
 */
@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<IRoom>,
    private readonly profileService: ProfileService,
    private readonly messageService: MessageService
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

    // add room to joined groups
    admin.groups.push(room);
    await admin.save();

    // add admin to members list
    room.members.push(admin);
    await room.save();

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

  async getRoomsByName(name: string): Promise<IRoom[]> {
    const room = await this.roomModel.find({
      name: { $regex: this.replace(name), $options: 'i' },
    });
    return room;
  }

  async getRoomById(id: string): Promise<IRoom> {
    const room = await this.roomModel
      .findById(id)
      .populate('admin', 'id name username avatar university')
      .populate('members', 'id name username avatar university')
      .exec();
    return room;
  }

  async getRoomByUser(user: IProfile): Promise<IRoom[]> {
    await user.populate('groups').execPopulate();
    return user.groups;
  }

  async join(roomId: string, user: IProfile): Promise<IRoom> {
    const room = await this.getRoomById(roomId);

    await user.populate('groups').execPopulate();
    await room.populate('admin').execPopulate();

    if (!room) {
      throw new NotFoundException(`The room with id  ${roomId} was not found`);
    }

    const isMember = this.userIsMember(room, user);

    if (isMember) {
      return;
    }

    user.groups.push(room);
    room.members.push(user);

    await user.save();
    await room.save();
  }

  async leave(roomId: string, user: IProfile): Promise<void> {
    const room = await this.getRoomById(roomId);

    await user.populate('groups').execPopulate();
    await room.populate('admin').execPopulate();

    if (!room) {
      throw new NotFoundException(`The room with id  ${roomId} was not found`);
    }

    if (this.userIsAdmin(room, user)) {
      throw new BadRequestException('O administrador não pode sair da sala.');
    }

    // remove user from room
    await this.roomModel.findByIdAndUpdate(room.id, {
      $pullAll: { members: [user] },
    });

    // remove room from user
    await this.profileService.leaveRoom(user, room);
  }

  userIsMember(room: IRoom, user: IProfile): boolean {
    return (
      this.userIsAdmin(room, user) || user.groups.some((r) => r.id === room.id)
    );
  }

  userIsAdmin(room: IRoom, user: IProfile): boolean {
    return user.id === room.admin.id;
  }

  replace(query: string): string {
    return query
      .replace(/a/g, '[a,á,à,ä]')
      .replace(/e/g, '[e,é,ë]')
      .replace(/i/g, '[i,í,ï]')
      .replace(/o/g, '[o,ó,ö,ò]')
      .replace(/u/g, '[u,ü,ú,ù]');
  }
}
