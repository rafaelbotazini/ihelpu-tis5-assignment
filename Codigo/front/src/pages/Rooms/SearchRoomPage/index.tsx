import React, { useEffect, useState } from 'react';
import RoomCard from '../../../components/RoomCard';
import { Room } from '../../../models/Room';
import api from '../../../services/api';
import {
  Container,
  ResultsContainer,
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchStatus,
  ResultsList,
} from './styles';

const SearchRoomPage: React.FC = () => {
  const [results, setResults] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.rooms
      .list()
      .then(setResults)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <SearchContainer>
        <h1>Pesquisar sala</h1>
        <SearchInputWrapper>
          <SearchInput name="roomName" placeholder="Nome da sala ou assunto" />
        </SearchInputWrapper>
      </SearchContainer>
      <ResultsContainer>
        <SearchStatus>
          {loading && 'Carregando...'}
          {!loading && !results.length && 'Nenhum resultado encontrado'}
          {!loading && results.length && 'Resultados encontrados:'}
        </SearchStatus>
        <ResultsList>
          {!loading &&
            results.map((room) => <RoomCard key={room._id} room={room} />)}
        </ResultsList>
      </ResultsContainer>
    </Container>
  );
};

export default SearchRoomPage;
