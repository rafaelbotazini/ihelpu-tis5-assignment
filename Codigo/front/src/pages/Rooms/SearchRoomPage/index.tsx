import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import CardList from '../../../components/CardList';
import RoomCard from '../../../components/RoomCard';
import { useGroups } from '../../../contexts/UserGroupsContext';
import { Room } from '../../../models/Room';
import api from '../../../services/api';
import {
  Container,
  ResultsContainer,
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchStatus,
} from './styles';

const SearchRoomPage: React.FC = () => {
  const history = useHistory();
  const { rooms, addRoom } = useGroups();
  const [results, setResults] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.rooms
      .list()
      .then(setResults)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    e.preventDefault();

    await api.rooms
      .searchRooms(e.target.value)
      .then(setResults)
      .finally(() => setLoading(false));
  };

  const handleJoin = async (roomId: string): Promise<void> => {
    await api.rooms
      .join(roomId)
      .then(addRoom)
      .then(() => history.push(`/app/rooms/${roomId}`));
  };

  return (
    <Container>
      <SearchContainer>
        <h1>Pesquisar sala</h1>
        <SearchInputWrapper>
          <SearchInput
            name="roomName"
            placeholder="Nome da sala ou assunto"
            onChange={handleChange}
          />
        </SearchInputWrapper>
      </SearchContainer>
      <ResultsContainer>
        <SearchStatus>
          {loading && 'Carregando...'}
          {!loading && !results.length && 'Nenhum resultado encontrado'}
          {!loading && results.length && 'Resultados encontrados:'}
        </SearchStatus>
        <CardList>
          {!loading &&
            results.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                renderActions={() =>
                  rooms.some((r) => r.id === room.id) ? (
                    <Button
                      onClick={() => history.push(`/app/rooms/${room.id}`)}
                    >
                      Entrar
                    </Button>
                  ) : (
                    <Button onClick={() => handleJoin(room.id)}>
                      Participar
                    </Button>
                  )
                }
              />
            ))}
        </CardList>
      </ResultsContainer>
    </Container>
  );
};

export default SearchRoomPage;
