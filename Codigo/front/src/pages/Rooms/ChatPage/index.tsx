import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import MessageBoard from '../../../components/MessageBoard';
import { useAuth } from '../../../contexts/AuthContext';
import { useChat } from '../../../contexts/ChatContext';
import { useGroups } from '../../../contexts/UserGroupsContext';
import api from '../../../services/api';
import { Wrapper, Container, OptionsBar, OptionLink } from './styles';

const ChatPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const chat = useChat(id);
  const { removeRoom } = useGroups();
  const [textMessage, setTextMessage] = useState('');

  const handleGroupUnsubscribe = (): void => {
    const confirmExit = window.confirm(
      'Você não fará mais parte deste grupo. Tem certeza?',
    );

    if (confirmExit) {
      api.rooms.leave(id).then(() => {
        removeRoom(id);
        history.push('/');
      });
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      submitMessage();
    }
  };

  const submitMessage = (): void => {
    if (textMessage) {
      chat.sendTextMessage(textMessage);
      setTextMessage('');
    }
  };

  if (chat.loading) {
    return <Container>Carregando os dados da sala...</Container>;
  }

  if (!chat || !chat.id) {
    return <Container>Sala não encontrada</Container>;
  }

  return (
    <Wrapper>
      <OptionsBar>
        {user.id === chat.admin.id && (
          <OptionLink onClick={() => history.push('edit/' + id)}>
            Editar
          </OptionLink>
        )}

        <OptionLink onClick={handleGroupUnsubscribe}>Sair</OptionLink>
      </OptionsBar>
      <Container>
        <div>
          {chat.name}
          <small> ({chat.members.length} usuários)</small>
        </div>

        <MessageBoard chat={chat} user={user} />

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
          <Button style={{ width: 'auto', margin: 0 }} onClick={submitMessage}>
            <FaPaperPlane />
          </Button>
        </div>
      </Container>
    </Wrapper>
  );
};

export default ChatPage;
