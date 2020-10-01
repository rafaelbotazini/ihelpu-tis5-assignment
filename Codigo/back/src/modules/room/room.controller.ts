import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoomService } from "./room.service";
import { IRoom } from "./room.model";
import { CreateRoomPayload } from "./payload/CreateRoomPayload";
import { IProfile } from "modules/profile/profile.model";

/**
 * Room Controller
 */
@ApiBearerAuth()
@ApiTags("room")
@Controller("api/room")
export class RoomControler {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Rooms Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Rooms Request Failed" })
  async listRooms(): Promise<IRoom[]> {
    return await this.roomService.listRooms();
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 201, description: "Create Room Request Received" })
  @ApiResponse({ status: 400, description: "Create Room Request Failed" })
  async createRoom(
    @Request() req: { user: IProfile },
    @Body() payload: CreateRoomPayload,
  ): Promise<IRoom> {
    return await this.roomService.createRoom(payload, req.user._id);
  }
}
