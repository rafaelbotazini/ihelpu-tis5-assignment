import { ApiProperty } from '@nestjs/swagger';

export class EditRoomPayload {
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatar: string;
}
