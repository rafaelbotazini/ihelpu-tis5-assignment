import React from 'react';
import { Room } from '../../models/Room';
import { RoomAvatarWrapper } from './style';

export type RoomAvatarProps = {
  room: Room;
  fontSize?: number;
  size?: number;
  style?: React.CSSProperties;
};

const RoomAvatar: React.FC<RoomAvatarProps> = ({
  room,
  size,
  fontSize,
  style,
}) => {
  return (
    <RoomAvatarWrapper
      room={room}
      size={size}
      fontSize={fontSize}
      style={style}
    >
      {!!room.avatar && <img src={room.avatar} alt={room.name + ' avatar'} />}
      {!room.avatar && room.name[0]}
    </RoomAvatarWrapper>
  );
};

export default RoomAvatar;
