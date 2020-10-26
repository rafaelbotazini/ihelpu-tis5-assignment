import { Message, Subscription } from 'stompjs';
import client from '../wsRequest';

export const sendTextMessage = (
  roomId: string,
  userId: string,
  message: string,
): void => {
  client.send(
    '/exchange/chat_messages/send_text.' + roomId,
    { 'content-type': 'text/plain' },
    JSON.stringify({
      userId,
      message,
    }),
  );
};

export const subscribeToChatMessages = (
  roomId: string,
  callback: (msg: Message) => void,
): Subscription => {
  return client.subscribe(
    '/exchange/chat_messages/send_text.' + roomId,
    callback,
  );
};
