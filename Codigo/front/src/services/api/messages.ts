import { ChatMessage } from '../../models/ChatMessage';
import apiRequest from '../apiRequest';

export const getMessagesByRoom = (roomId: string): Promise<ChatMessage[]> =>
  apiRequest.get('/message/' + roomId).then(({ data }) => data);
