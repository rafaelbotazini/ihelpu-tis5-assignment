import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import CardList from '../../../components/CardList';
import RoomCard from '../../../components/RoomCard';
import { UserGroupsContext } from '../../../contexts/UserGroupsContext';
import { Room } from '../../../models/Room';
import api from '../../../services/api';
import { searchRooms } from '../../../services/api/rooms';
import {
  Container,
  ResultsContainer,
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchStatus,
} from './styles';
import { useDebounce } from 'use-debounce';

const SearchRoomPage: React.FC = () => {
  const history = useHistory();
  const { rooms, addRoom } = useContext(UserGroupsContext);
  const [results, setResults] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState('');
<<<<<<< Updated upstream
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(query, 500);
=======
>>>>>>> Stashed changes

  useEffect(() => {
    if (debouncedSearchTerm){
      setIsSearching(true);
      api.rooms.searchRooms(query).then(results => {
        setIsSearching(false);
        setResults(results);
      })
    } else {
    api.rooms
      .list()
      .then(setResults)
      .finally(() => setLoading(false));
    }
  }, []);

<<<<<<< Updated upstream
  const handleChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();

    await api.rooms.searchRooms(e.target.value).then(setResults);
  }
=======
  // const searchRoom = async (query: string): Promise<void> => {
  //   await api.rooms
  //     .join(roomId)
  //     .then(addRoom)
  //     .then(() => history.push(`/app/rooms/${roomId}`));
  // };
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          <SearchInput name="roomName" placeholder="Nome da sala ou assunto" onChange={handleChange}/>
=======
          <SearchInput name="roomName" placeholder="Nome da sala ou assunto" value="query" />
>>>>>>> Stashed changes
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
