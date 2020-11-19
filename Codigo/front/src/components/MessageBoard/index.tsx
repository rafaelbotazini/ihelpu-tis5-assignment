import React, { useEffect, useRef } from 'react';
import { ChatContextData } from '../../contexts/ChatContext';
import { Profile } from '../../models/Profile';
import MessagePill from '../MessagePill';
import {
  BoardWrapper,
  Board,
  MessagesWrapper,
  LoadMessagesButton,
} from './styles';

type MessageBoardProps = {
  user: Profile;
  chat: ChatContextData;
};

const MessageBoard: React.FC<MessageBoardProps> = ({ user, chat }) => {
  const { messages } = chat;

  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottom.current) {
      bottom.current.scrollIntoView();
    }
  });

  return (
    <BoardWrapper>
      <Board>
        <MessagesWrapper>
          <LoadMessagesButton onClick={chat.loadOlderMessages}>
            Carregar mensagens anteriores
          </LoadMessagesButton>
          {messages.map((message) => {
            const sender = chat.members.find((u) => u.id === message.fromId);
            const isCurrentUser = !!sender && sender.id === user.id;
            const isAdmin = !!sender && sender.id === chat.admin.id;

            return (
              <MessagePill
                key={message.id}
                message={message}
                user={sender}
                isCurrentUser={isCurrentUser}
                isAdmin={isAdmin}
              />
            );
          })}
        </MessagesWrapper>
        <div ref={bottom} />
      </Board>
    </BoardWrapper>
  );
};

export default MessageBoard;
