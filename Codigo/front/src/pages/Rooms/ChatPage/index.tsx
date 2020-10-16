import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import { useCurrentUser } from '../../../contexts/currentUser';
import { Room } from '../../../models/Room';
import api from '../../../services/api';
import { Container } from './styles';

const ChatPage: React.FC = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const { setUser } = useCurrentUser();

  const removeRoom = (): void => {
    setUser((u) => {
      if (!u) return u;

      const groups = (u.groups as Room[]).concat([]);
      const idx = groups.findIndex((r) => r.id === id);

      groups.splice(idx, 1);

      return { ...u, groups };
    });
  };

  const handleGroupUnsubscribe = (): void => {
    api.rooms.leave(id).then(() => {
      removeRoom();
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
