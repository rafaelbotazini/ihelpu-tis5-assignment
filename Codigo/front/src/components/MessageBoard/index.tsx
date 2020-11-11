import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../models/ChatMessage';
import { Profile } from '../../models/Profile';
import MessagePill from '../MessagePill';
import {
  BoardWrapper,
  Board,
  MessagesWrapper,
  LoadMessagesButton,
} from './styles';

type MessageBoardProps = {
  messages: ChatMessage[];
  currentUser: Profile;
  admin: Profile;
  members: Profile[];
  onLoadMessagesClick: () => void;
};

const MessageBoard: React.FC<MessageBoardProps> = ({
  messages,
  members,
  currentUser,
  admin,
  onLoadMessagesClick,
}) => {
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
          <LoadMessagesButton onClick={onLoadMessagesClick}>
            Carregar mensagens anteriores
          </LoadMessagesButton>
          {messages.map((message) => {
            const user = members.find((u) => u.id === message.fromId);
            const isCurrentUser = !!user && user.id === currentUser.id;
            const isAdmin = !!user && user.id === admin.id;

            return (
              <MessagePill
                key={message.id}
                message={message}
                user={user}
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
