export interface Room {
  _id: string;
  admin: string;
  name: string;
  avatar: string;
  members?: number;
  university?: string;
}
