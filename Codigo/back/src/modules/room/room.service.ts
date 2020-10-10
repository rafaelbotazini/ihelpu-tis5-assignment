import { Model, Schema } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { IRoom } from "./room.model";
import { CreateRoomPayload } from "./payload/CreateRoomPayload";
import { EditRoomPayload } from "./payload/EditRoomPayload";

/**
 * Room Service
 */
@Injectable()
export class RoomService {
  constructor(@InjectModel("Room") private readonly roomModel: Model<IRoom>) {}

  /**
   * Creates a room in the database
   * @param payload New room info
   * @param adminId The room creator ID
   */
  async createRoom(
    payload: CreateRoomPayload,
    adminId: Schema.Types.ObjectId,
  ): Promise<IRoom> {
    const room = await this.roomModel.create({
      name: payload.name,
      admin: adminId,
    });
    return room;
  }

  /**
   * Fetch all rooms
   */
  async listRooms(): Promise<IRoom[]> {
    return await this.roomModel.find({});
  }

  async editRoom(
    id: string,
    payload: EditRoomPayload,
  ): Promise<void> {
    await this.roomModel.findByIdAndUpdate(id, payload);
  }

  async getRoomById(
    id: string,
  ): Promise<IRoom> {
    const room = await this.roomModel.findById(id);
    return room;
  }

}
