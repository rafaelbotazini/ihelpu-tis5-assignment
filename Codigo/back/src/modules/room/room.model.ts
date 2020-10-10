import { Schema, Document } from "mongoose";
import { AppRoles } from "modules/app/app.roles";

/**
 * Mongoose Room Schema
 */
export const Room = new Schema({
  admin: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
},
{
  id: true,
}
);

/**
 * Mongoose Room Document
 */
export interface IRoom extends Document {
  /**
   * UUID
   */
  readonly _id: Schema.Types.ObjectId;
  readonly id: string;
  /**
   * Admin ID
   */
  readonly admin: Schema.Types.ObjectId;
  /**
   * Name
   */
  readonly name: string;
  /**
   * Gravatar
   */
  readonly avatar: string;
  /**
   * Date
   */
  readonly date: Date;
}
