import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardList from '../../../components/CardList';
import RoomCard from '../../../components/RoomCard';
import { Container } from '../../../components/Layout/styles';
import { Room } from '../../../models/Room';
import api from '../../../services/api';

const RoomsListingPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    api.rooms.list().then(setRooms);
  }, []);

  return (
    <Container>
      <h1>Salas disponíveis:</h1>

      <div style={{ marginBottom: 24 }}>
        <CardList>
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              renderActions={() => (
                <Link to={'/app/rooms/edit/' + room.id}>Editar Sala</Link>
              )}
            />
          ))}
        </CardList>
      </div>
    </Container>
  );
};

export default RoomsListingPage;
