import { Model, Schema } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { IRoom } from "./room.model";
import { CreateRoomPayload } from "./payload/CreateRoomPayload";

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
}
