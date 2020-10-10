import React, { useEffect, useState } from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
      <Link to="/app/rooms/create">Criar sala</Link>

      <h1>Salas disponíveis:</h1>

      <div style={{ marginBottom: 24 }}>
        {rooms.map((room) => (
          <div key={room._id} style={{ marginBottom: 24, display: 'flex' }}>
            <h2>
              {room.avatar && (
                <img
                  height="16"
                  src={room.avatar}
                  alt={'Avatar da sala' + room.name}
                />
              )}
              <Link to={'/app/rooms/edit/' + room._id}>Editar Sala</Link>
              {!room.avatar && <FiBookOpen size="18" />} {room.name}
            </h2>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RoomsListingPage;
