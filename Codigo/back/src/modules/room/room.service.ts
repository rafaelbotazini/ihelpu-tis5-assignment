import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IRoom } from './room.model';
import { CreateRoomPayload } from './payload/CreateRoomPayload';
import { EditRoomPayload } from './payload/EditRoomPayload';
import { ProfileService } from 'modules/profile/profile.service';
import { IProfile } from 'modules/profile/profile.model';
import { NotificationService } from 'modules/notification/notification.service';

/**
 * Room Service
 */
@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<IRoom>,
    private readonly profileService: ProfileService,
    private readonly notificationService: NotificationService,
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
    return await this.roomModel
      .find({})
      .populate('admin', 'username university');
  }

  async editRoom(id: string, payload: EditRoomPayload): Promise<void> {
    await this.roomModel.findByIdAndUpdate(id, payload);
    this.notificationService.notifyRoomChanged(id, payload);
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
      return room;
    }

    user.groups.push(room);
    room.members.push(user);

    await user.save();
    await room.save();

    this.notificationService.notifyUserJoined(room.id, {
      roomId,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      university: user.university,
    });

    return room;
  }

  async leave(roomId: string, user: IProfile): Promise<void> {
    const room = await this.getRoomById(roomId);

    await user.populate('groups').execPopulate();
    await room.populate('admin').execPopulate();

    if (!room) {
      throw new NotFoundException(`The room with id  ${roomId} was not found`);
    }

    // remove room from user
    await this.profileService.leaveRoom(user, room);

    // remove user from room
    if (!this.userIsAdmin(room, user)) {
      await this.roomModel.findByIdAndUpdate(room.id, {
        $pullAll: { members: [user] },
      });
    } else if (room.members.length >= 2) {
      const newAdmin = room.members[1];

      await this.roomModel.findByIdAndUpdate(room.id, {
        $pullAll: { members: [user] },
        admin: newAdmin,
      });

      this.notificationService.notifyRoomAdminChanged(room.id, newAdmin.id);
    } else {
      await this.roomModel.findByIdAndRemove(roomId);
    }
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
