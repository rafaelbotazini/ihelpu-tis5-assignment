import { Room } from '../../models/Room';
import apiRequest from '../apiRequest';

export const list = (): Promise<Room[]> =>
  apiRequest.get('/room').then(({ data }) => data);

export const create = (name: string): Promise<Room> =>
  apiRequest.post('/room', { name }).then(({ data }) => data);

export const get = (id: string): Promise<Room> =>
  apiRequest.get('/room/' + id).then(({ data }) => data);

export const edit = (room: Room): Promise<void> =>
  apiRequest.put('/room/' + room.id, room);

export const join = (roomId: string): Promise<Room> =>
  apiRequest.post(`/room/${roomId}/join`).then(({ data }) => data);

export const leave = (roomId: string): Promise<void> =>
  apiRequest.post(`/room/${roomId}/leave`);
