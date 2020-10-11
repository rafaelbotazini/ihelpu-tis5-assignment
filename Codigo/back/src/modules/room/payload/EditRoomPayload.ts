import { ApiProperty } from "@nestjs/swagger";
import { Schema } from "mongoose";
import { ObjectID } from "typeorm";

export class EditRoomPayload {
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatar: string;
}
