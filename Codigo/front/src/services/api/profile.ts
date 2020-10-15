import { Room } from '../../models/Room';
import apiRequest from '../apiRequest';

export const getRooms = (): Promise<Room[]> =>
  apiRequest.get('/room/subscribed').then(({ data }) => data);
