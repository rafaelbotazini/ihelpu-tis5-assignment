import { ChatMessage } from '../../models/ChatMessage';
import apiRequest from '../apiRequest';

export const getMessagesBefore = (
  roomId: string,
  date: string,
): Promise<ChatMessage[]> =>
  apiRequest.get(`/message/${roomId}/before/${date}`).then(({ data }) => data);

export const getMessagesByRoom = (roomId: string): Promise<ChatMessage[]> =>
  apiRequest.get('/message/' + roomId).then(({ data }) => data);
