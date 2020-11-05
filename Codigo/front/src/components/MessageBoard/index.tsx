import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../models/ChatMessage';
import { Profile } from '../../models/Profile';
import MessagePill from '../MessagePill';
import { BoardWrapper, Board, MessagesWrapper } from './styles';

type MessageBoardProps = {
  messages: ChatMessage[];
  currentUser: Profile;
  admin: Profile;
  members: Profile[];
};

const MessageBoard: React.FC<MessageBoardProps> = ({
  messages,
  members,
  currentUser,
  admin,
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
          {messages.map((message) => {
            const user = members.find(
              (u) => u.id === message.fromId,
            ) as Profile;
            const isCurrentUser = user.id === currentUser.id;
            const isAdmin = user.id === admin.id;

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
