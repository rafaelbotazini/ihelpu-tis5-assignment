import { Document, Schema } from 'mongoose';
import { AppRoles } from 'modules/app/app.roles';
import { DefaultSchema } from 'common/schemas/default.schema';
import { IRoom } from 'modules/room/room.model';

/**
 * Mongoose Profile Schema
 */
export const Profile = new DefaultSchema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: {
    type: String,
    required: true,
    select: false /* hide password field when fetching */,
  },
  university: { type: String, required: true },
  avatar: { type: String, required: true },
  roles: [{ type: String }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
});

/**
 * Mongoose Profile Document
 */
export interface IProfile extends Document {
  /**
   * UUID
   */
  readonly id: string;
  /**
   * Username
   */
  readonly username: string;
  /**
   * Email
   */
  readonly email: string;
  /**
   * Name
   */
  readonly name: string;
  /**
   * Password
   */
  password: string;
  /**
   * Gravatar
   */
  readonly avatar: string;
  /**
   * Univeristy name
   */
  readonly university: string;
  /**
   * Rooms
   */
  readonly groups: IRoom[];
  /**
   * Roles
   */
  readonly roles: AppRoles;
  /**
   * Creation date
   */
  readonly createdAt: Date;
  /**
   * Last update
   */
  readonly updatedAt: Date;
}
