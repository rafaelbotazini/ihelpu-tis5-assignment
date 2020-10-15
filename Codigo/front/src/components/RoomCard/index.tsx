import React from 'react';
import { Room } from '../../models/Room';
import { Card, RoomAvatar, RoomDetails } from './styles';

type RoomCardProps = {
  room: Room;
  renderActions?: (room: Room) => React.ReactNode;
};

const RoomCard: React.FC<RoomCardProps> = ({ room, renderActions }) => {
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
      {renderActions && renderActions(room)}
    </Card>
  );
};

export default RoomCard;
