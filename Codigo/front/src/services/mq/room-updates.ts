import { Message, Subscription } from 'stompjs';
import { Profile } from '../../models/Profile';
import client from '../wsRequest';

export type EditRoomPayload = {
  name: string;
  avatar: string;
};

export const subscribeToRoomUpdates = (
  roomId: string,
  callback: (payload: EditRoomPayload, message: Message) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/updated.' + roomId,
    (message) => callback(JSON.parse(message.body), message),
    { ack: 'client' },
  );
};

export const subscribeToUserLeft = (
  roomId: string,
  callback: (userId: string, message: Message) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/user_left.' + roomId,
    (message) => callback(message.body, message),
    { ack: 'client' },
  );
};

export const subscribeToAdminChanged = (
  roomId: string,
  callback: (userId: string, message: Message) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/admin_changed.' + roomId,
    (message) => callback(message.body, message),
    { ack: 'client' },
  );
};

export const subscribeToUserJoined = (
  roomId: string,
  callback: (user: Profile, message: Message) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/user_joined.' + roomId,
    (message) => callback(JSON.parse(message.body), message),
    { ack: 'client' },
  );
};

export const subscribeToUserUpdated = (
  roomId: string,
  callback: (user: Profile, message: Message) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/user_updated.' + roomId,
    (message) => callback(JSON.parse(message.body), message),
    { ack: 'client' },
  );
};
