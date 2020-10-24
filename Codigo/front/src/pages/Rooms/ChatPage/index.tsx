import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import { UserGroupsContext } from '../../../contexts/UserGroupsContext';
import api from '../../../services/api';
import { Container } from './styles';

const ChatPage: React.FC = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const { removeRoom } = useContext(UserGroupsContext);

  const handleGroupUnsubscribe = (): void => {
    api.rooms.leave(id).then(() => {
      removeRoom(id);
      history.push('/');
    });
  };

  return (
    <Container>
      <p>Chat ID: {id}</p>
      <Button onClick={handleGroupUnsubscribe}>
        <FaTimes />
        Sair do grupo
      </Button>
    </Container>
  );
};

export default ChatPage;
