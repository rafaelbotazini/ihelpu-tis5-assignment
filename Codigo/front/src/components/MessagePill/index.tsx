import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChatMessage } from '../../models/ChatMessage';
import { Profile } from '../../models/Profile';
import {
  MessageContainer,
  MessageAvatar,
  MessageContentWrapper,
  MessageContent,
  MessageHeader,
  UserInfo,
  MessageTime,
} from './styles';

type MessagePillProps = {
  message: ChatMessage;
  user?: Profile;
  isCurrentUser: boolean;
  isAdmin: boolean;
};

const MessagePill: React.FC<MessagePillProps> = ({
  message,
  user,
  isCurrentUser,
  isAdmin,
}) => {
  return (
    <MessageContainer position={isCurrentUser ? 'right' : 'left'}>
      {user && !isCurrentUser && (
        <MessageAvatar avatar={`https://www.gravatar.com/avatar/${user.id}`} />
      )}

      {!user && <MessageAvatar avatar="#" />}

      <MessageContentWrapper>
        <MessageHeader>
          {user && !isCurrentUser && (
            <UserInfo>
              <strong>{user.username}</strong> - {user.university}{' '}
              {isAdmin && '(admin)'}
            </UserInfo>
          )}

          {!user && <UserInfo>[removido]</UserInfo>}

          <MessageTime>
            {format(new Date(message.createdAt), 'PPpp', {
              locale: ptBR,
            })}
          </MessageTime>
        </MessageHeader>
        <MessageContent>{message.text}</MessageContent>
      </MessageContentWrapper>
    </MessageContainer>
  );
};

export default MessagePill;
