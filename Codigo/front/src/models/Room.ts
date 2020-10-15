import Profile from './Profile';

export interface Room {
  id: string;
  admin?: Profile;
  name: string;
  avatar: string;
  members?: string[];
}
