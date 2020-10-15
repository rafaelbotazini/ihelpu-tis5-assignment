import React from 'react';
import { Room } from '../../models/Room';
import Button from '../Button';
import { Card, RoomAvatar, RoomDetails } from './styles';

type RoomCardProps = {
  room: Room;
};

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <Card>
      <RoomAvatar>
        {!!room.avatar && <img src={room.avatar} alt={room.name + ' avatar'} />}
        {!room.avatar && room.name[0]}
      </RoomAvatar>
      <h4 style={{ marginBottom: 12 }}>{room.name}</h4>
      <RoomDetails>
        <p>{room.university || 'PUC Minas'}</p>
        <small>{room.members || 0} membros</small>
      </RoomDetails>
      <Button>Participar</Button>
    </Card>
  );
};

export default RoomCard;
