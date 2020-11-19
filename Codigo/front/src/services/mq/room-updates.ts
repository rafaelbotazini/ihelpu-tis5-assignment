import { Message, Subscription } from 'stompjs';
import { Profile } from '../../models/Profile';
import client from '../wsRequest';

export type StompMessage = Message & {
  headers: {
    'message-id': string;
  };
};

export type EditRoomPayload = {
  name: string;
  avatar: string;
};

export type UserJoinedNotificationPayload = {
  userId: string;
  roomId: string;
  username: string;
  university: string;
  avatar: string;
};

export const subscribeToRoomUpdates = (
  roomId: string,
  callback: (payload: EditRoomPayload, message: StompMessage) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/updated.' + roomId,
    (message) => callback(JSON.parse(message.body), message as StompMessage),
    { ack: 'client' },
  );
};

export const subscribeToUserLeft = (
  roomId: string,
  callback: (userId: string, message: StompMessage) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/user_left.' + roomId,
    (message) => callback(JSON.parse(message.body), message as StompMessage),
    { ack: 'client' },
  );
};

export const subscribeToAdminChanged = (
  roomId: string,
  callback: (userId: string, message: StompMessage) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/admin_changed.' + roomId,
    (message) => callback(JSON.parse(message.body), message as StompMessage),
    { ack: 'client' },
  );
};

export const subscribeToUserJoined = (
  roomId: string,
  callback: (
    user: UserJoinedNotificationPayload,
    message: StompMessage,
  ) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/user_joined.' + roomId,
    (message) => callback(JSON.parse(message.body), message as StompMessage),
    { ack: 'client' },
  );
};

export const subscribeToUserUpdated = (
  roomId: string,
  callback: (user: Profile, message: StompMessage) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/room_updates/user_updated.' + roomId,
    (message) => callback(JSON.parse(message.body), message as StompMessage),
    { ack: 'client' },
  );
};
