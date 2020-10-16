import React from 'react';
import RoomAvatar from '../RoomAvatar';
import { Room } from '../../models/Room';
import { Card, RoomDetails } from './styles';

type RoomCardProps = {
  room: Room;
  renderActions?: (room: Room) => React.ReactNode;
};

const RoomCard: React.FC<RoomCardProps> = ({ room, renderActions }) => {
  return (
    <Card>
      <RoomAvatar room={room} style={{ marginBottom: 12 }} />
      <h4 style={{ marginBottom: 12 }}>{room.name}</h4>
      <RoomDetails>
        <p>{room.admin && room.admin.university}</p>
        <small>{(room.members || []).length} membro(s)</small>
      </RoomDetails>
      {renderActions && renderActions(room)}
    </Card>
  );
};

export default RoomCard;
