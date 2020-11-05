import React, { useContext, useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import MessageBoard from '../../../components/MessageBoard';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
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
  const { user } = useContext(CurrentUserContext);
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
    if (e.key === 'Enter' && user && textMessage) {
      mq.chatMessages.sendTextMessage(id, user.id, textMessage);
      setTextMessage('');
    }
  };

  useEffect(() => {
    // fetch room
    setLoading(true);
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

        {user?.id !== room.admin?.id && (
          <OptionLink onClick={handleGroupUnsubscribe}>Sair</OptionLink>
        )}
      </OptionsBar>
      <Container>
        <h1>{room.name}</h1>

        <MessageBoard
          messages={messages}
          currentUser={user as Profile}
          members={room.members as Profile[]}
          admin={room.admin as Profile}
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
          <Button style={{ width: 'auto', margin: 0 }}>
            <FaPaperPlane />
          </Button>
        </div>
      </Container>
    </Wrapper>
  );
};

export default ChatPage;
