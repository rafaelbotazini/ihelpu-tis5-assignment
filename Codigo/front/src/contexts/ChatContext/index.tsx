import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChatMessage } from '../../models/ChatMessage';
import { Profile } from '../../models/Profile';
import api from '../../services/api';
import mq from '../../services/mq';
import { useAuth } from '../AuthContext';

export interface ChatState {
  loading: boolean;
  id: string;
  name: string;
  admin: Profile;
  members: Profile[];
  messages: ChatMessage[];
}

export interface ChatContextData extends ChatState {
  setState: React.Dispatch<React.SetStateAction<ChatState>>;
  loadOlderMessages: () => void;
  sendTextMessage: (text: string) => void;
}

export const ChatContext = createContext<ChatContextData>(
  {} as ChatContextData,
);

export const ChatProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState({
    loading: true,
  } as ChatState);

  const { messages } = state;

  const loadOlderMessages = (): void => {
    const request: Promise<ChatMessage[]> = messages.length
      ? api.message.getMessagesBefore(state.id, messages[0].createdAt)
      : api.message.getMessagesByRoom(state.id);
    request.then(prependMessages);
  };

  const sendTextMessage = (text: string): void => {
    mq.chatMessages.sendTextMessage(state.id, user.id, text);
  };

  const appendMessages = (items: ChatMessage[]): void => {
    setState((current) => ({
      ...current,
      messages: current.messages.concat(items),
    }));
  };

  const prependMessages = (items: ChatMessage[]): void => {
    setState((current) => ({
      ...current,
      messages: items.concat(current.messages),
    }));
  };

  useEffect(() => {
    if (state.id) {
      // TODO: Currently using temp query. Move to user query to achieve at-least-once.
      const messageSub = mq.chatMessages.subscribeToChatMessages(
        state.id,
        (payload, msg) => {
          appendMessages([payload]);
          msg.ack();
        },
      );

      return () => {
        messageSub.unsubscribe();
      };
    }
    return () => void 0;
  }, [state.id]);

  return (
    <ChatContext.Provider
      value={{
        ...state,
        messages,
        setState,
        loadOlderMessages,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(roomId: string): ChatContextData {
  const context = useContext(ChatContext);

  const { setState } = context;

  useEffect(() => {
    const loadRoom = async (roomId: string): Promise<void> => {
      setState((current) => ({ ...current, loading: true }));

      const room = await api.rooms.get(roomId);

      setState({
        ...room,
        messages: [],
        loading: false,
      });
    };

    loadRoom(roomId);
  }, [roomId, setState]);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
