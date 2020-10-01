import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomPayload {
  @ApiProperty()
  name: string;
}
