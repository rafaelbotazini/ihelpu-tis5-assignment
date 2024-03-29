import { Profile } from '../../models/Profile';
import { Room } from '../../models/Room';
import { UpdateUserPayload } from '../../models/UpdateUserPayload';
import apiRequest from '../apiRequest';

export const getRooms = (): Promise<Room[]> =>
  apiRequest.get('/room/subscribed').then(({ data }) => data);

export const getCurrent = (): Promise<Profile> =>
  apiRequest.get('/request/user').then(({ data }) => data);

export const update = (user: UpdateUserPayload): Promise<Profile> =>
  apiRequest.patch('/profile', user).then((response) => response.data);
