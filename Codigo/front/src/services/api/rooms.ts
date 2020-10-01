import { Room } from '../../models/Room';
import apiRequest from '../apiRequest';

export const list = (): Promise<Room[]> =>
  apiRequest.get('/room').then(({ data }) => data);

export const create = (name: string): Promise<Room> =>
  apiRequest.post('/room', { name }).then(({ data }) => data);
