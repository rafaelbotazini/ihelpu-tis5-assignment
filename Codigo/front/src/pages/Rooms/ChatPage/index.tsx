import React, { useContext, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { ConnectionStatusContext } from '../../../contexts/ConnectionStatusContext';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { UserGroupsContext } from '../../../contexts/UserGroupsContext';
import { ChatMessagePayload } from '../../../models/ChatMessagePayload';
import api from '../../../services/api';
import mq from '../../../services/mq';
import { Container } from './styles';

const ChatPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(CurrentUserContext);
  const { removeRoom } = useContext(UserGroupsContext);
  const { connected } = useContext(ConnectionStatusContext);

  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);
  const [textMessage, setTextMessage] = useState('');

  const handleGroupUnsubscribe = (): void => {
    api.rooms.leave(id).then(() => {
      removeRoom(id);
      history.push('/');
    });
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && user && textMessage) {
      mq.chatMessages.sendTextMessage(id, user.id, textMessage);
      setTextMessage('');
    }
  };

  useEffect(() => {
    if (connected) {
      const { unsubscribe } = mq.chatMessages.subscribeToChatMessages(
        id,
        (msg) => {
          setMessages((msgs) => msgs.concat([JSON.parse(msg.body)]));
          msg.ack();
        },
      );
      return () => {
        setMessages([]);
        unsubscribe();
      };
    }
  }, [connected, id]);

  return (
    <Container>
      {!connected && 'Conectando...'}
      {connected && (
        <>
          <p>Chat ID: {id}</p>

          <div
            style={{ marginBottom: 24, padding: 12, backgroundColor: '#000' }}
          >
            <pre>{JSON.stringify(messages, null, 2)}</pre>
          </div>

          <div>
            <Input
              name="message"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyPress={handleKeypress}
              placeholder="Digite sua mensagem"
            />
          </div>

          <Button onClick={handleGroupUnsubscribe}>
            <FaTimes />
            Sair do grupo
          </Button>
        </>
      )}
    </Container>
  );
};

export default ChatPage;
