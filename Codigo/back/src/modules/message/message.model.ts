import { Schema, Document } from 'mongoose';
import { IProfile } from 'modules/profile/profile.model';
import { DefaultSchema } from 'common/schemas/default.schema';
import { IRoom } from 'modules/room/room.model';

export const Message = new DefaultSchema({
  roomId: { type: String, required: true },
  fromId: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
});

Message.virtual('from', {
  ref: 'Profile',
  localField: 'fromId',
  foreignField: '_id',
  justOne: true,
});

Message.virtual('profile', {
  ref: 'Room',
  localField: 'roomId',
  foreignField: '_id',
  justOne: true,
});

export interface IMessage extends Document {
  readonly id: string;
  readonly roomId: string;
  readonly room?: IRoom;
  readonly fromId: string;
  readonly from?: IProfile;
  readonly text: string;
  readonly createdAt: Date;
}
