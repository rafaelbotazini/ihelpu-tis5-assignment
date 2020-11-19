import React, { useContext, useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import MessageBoard from '../../../components/MessageBoard';
import { useAuth } from '../../../contexts/AuthContext';
import { UserGroupsContext } from '../../../contexts/UserGroupsContext';
import { ChatMessage } from '../../../models/ChatMessage';
import { Profile } from '../../../models/Profile';
import { Room } from '../../../models/Room';
import api from '../../../services/api';
import mq from '../../../services/mq';
import { Wrapper, Container, OptionsBar, OptionLink } from './styles';

const ChatPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { removeRoom } = useContext(UserGroupsContext);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textMessage, setTextMessage] = useState('');
  const [room, setRoom] = useState<Room>({} as Room);

  const handleGroupUnsubscribe = (): void => {
    api.rooms.leave(id).then(() => {
      removeRoom(id);
      history.push('/');
    });
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendTextMessage();
    }
  };

  const sendTextMessage = (): void => {
    if (textMessage) {
      mq.chatMessages.sendTextMessage(id, user.id, textMessage);
      setTextMessage('');
    }
  };

  const loadOlderMessages = (): void => {
    const request: Promise<ChatMessage[]> = messages.length
      ? api.message.getMessagesBefore(id, messages[0].createdAt)
      : api.message.getMessagesByRoom(id);

    request.then((items) => setMessages((m) => m.concat(items)));
  };

  useEffect(() => {
    // fetch room
    setLoading(true);
    setMessages([]);

    api.rooms
      .get(id)
      .then(setRoom)
      .finally(() => setLoading(false));

    // receive messages
    const { unsubscribe } = mq.chatMessages.subscribeToChatMessages(
      id,
      (msg) => {
        setMessages((msgs) => msgs.concat([JSON.parse(msg.body)]));
        msg.ack();
      },
    );

    // TODO: get older messages
    return unsubscribe;
  }, [id]);

  if (loading) {
    return <Container>Carregando os dados da sala...</Container>;
  }

  if (!room || !room.id) {
    return <Container>Sala não encontrada</Container>;
  }

  return (
    <Wrapper>
      <OptionsBar>
        {user?.id === room.admin?.id && (
          <OptionLink onClick={() => history.push('edit/' + id)}>
            Editar
          </OptionLink>
        )}

        <OptionLink onClick={handleGroupUnsubscribe}>Sair</OptionLink>
      </OptionsBar>
      <Container>
        <div>
          {room.name}
          <small> ({room.members.length} usuários)</small>
        </div>

        <MessageBoard
          messages={messages}
          currentUser={user as Profile}
          members={room.members as Profile[]}
          admin={room.admin as Profile}
          onLoadMessagesClick={loadOlderMessages}
        />

        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 8, width: '100%' }}>
            <Input
              autoComplete="off"
              name="message"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyPress={handleKeypress}
              placeholder="Digite sua mensagem"
            />
          </div>
          <Button
            style={{ width: 'auto', margin: 0 }}
            onClick={sendTextMessage}
          >
            <FaPaperPlane />
          </Button>
        </div>
      </Container>
    </Wrapper>
  );
};

export default ChatPage;
