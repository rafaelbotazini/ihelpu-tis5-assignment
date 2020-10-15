import { Schema, Document } from 'mongoose';
import { DefaultSchema } from 'common/schemas/default.schema';
import { IProfile } from 'modules/profile/profile.model';

/**
 * Mongoose Room Schema
 */
export const Room = new DefaultSchema({
  name: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'Profile' },
  members: { type: Schema.Types.ObjectId, ref: 'Profile' },
  avatar: { type: String },
});

/**
 * Mongoose Room Document
 */
export interface IRoom extends Document {
  /**
   * UUID
   */
  readonly id: string;
  /**
   * Admin ID
   */
  readonly admin: IProfile;
  readonly members: IProfile[];
  /**
   * Name
   */
  readonly name: string;
  /**
   * Gravatar
   */
  readonly avatar: string;
  /**
   * Creation date
   */
  readonly createdAt: Date;
  /**
   * Last update
   */
  readonly updatedAt: Date;
}
