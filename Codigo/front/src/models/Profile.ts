import { Room } from './Room';

export interface Profile {
  id: string;
  name: string;
  username: string;
  university: string;
  groups: Room[] | string[];
}
