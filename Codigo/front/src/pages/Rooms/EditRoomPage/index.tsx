import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiEdit3, FiSave } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from '../../../components/Layout/styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { Room } from '../../../models/Room';
import { useGroups } from '../../../contexts/UserGroupsContext';

type PageParams = {
  id: string;
};

const EditRoomPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<PageParams>();
  const { updateRoom } = useGroups();
  const [room, setRoom] = useState<Room>({} as Room);
  const [loading, setLoading] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setRoom({ ...room, name: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!room.name) return;
    api.rooms.edit(room).then(() => {
      updateRoom(room);
      history.push('/app/rooms/' + id);
    });
  };

  useEffect(() => {
    setLoading(true);
    api.rooms
      .get(id)
      .then((r) => setRoom(r))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Container>Aguarde...</Container>;
  }

  return (
    <Container>
      <h1>Editar sala de estudos</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          id="name"
          value={room.name}
          onChange={handleChange}
          icon={FiEdit3}
          placeholder="Nome da sala"
        />
        <Button type="submit">
          <FiSave /> Salvar
        </Button>
      </form>
    </Container>
  );
};

export default EditRoomPage;
