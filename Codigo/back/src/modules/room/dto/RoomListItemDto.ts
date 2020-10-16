import { IRoom } from '../room.model';

export interface RoomListItemDto extends IRoom {
  memberCount: number;
  university: string;
}
