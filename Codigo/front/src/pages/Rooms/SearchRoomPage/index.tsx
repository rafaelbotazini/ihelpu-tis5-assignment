import React, { useEffect, useState } from 'react';
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
            results.map((room) => (
              <div key={room._id}>
                {room.avatar && (
                  <img
                    height="16"
                    src={room.avatar}
                    alt={'Avatar da sala' + room.name}
                  />
                )}
                {room.name}
              </div>
            ))}
        </ResultsList>
      </ResultsContainer>
    </Container>
  );
};

export default SearchRoomPage;
