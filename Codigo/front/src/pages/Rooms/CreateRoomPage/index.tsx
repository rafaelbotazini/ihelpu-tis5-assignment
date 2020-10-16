import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FiEdit3, FiSave } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container } from '../../../components/Layout/styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import api from '../../../services/api';

const CreateRoomPage: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!name) return;
    // TODO: send to actual room

    api.rooms.create(name).then(() => history.push('/app/rooms'));
  };

  return (
    <Container>
      <h1>Criar sala de estudos</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          icon={FiEdit3}
          placeholder="Nome da sala"
        />
        <Button type="submit">
          <FiSave /> Criar
        </Button>
      </form>
    </Container>
  );
};

export default CreateRoomPage;
