import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiEdit3, FiSave } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from '../../../components/Layout/styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';
import { Room } from '../../../models/Room';

type PageParams = {
  id: string;
};

const EditRoomPage: React.FC = () => {
  const history = useHistory();

  const { id } = useParams<PageParams>();

  const [room, setRoom] = useState<Room>({
    _id: '',
    admin: '',
    name: '',
    avatar: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setRoom({ ...room, name: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!room.name) return;
    api.rooms.edit(room).then(() => history.push('/app/rooms'));
  };

  useEffect(() => {
    api.rooms.get(id).then((r) => setRoom(r));
  }, [id]);

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
