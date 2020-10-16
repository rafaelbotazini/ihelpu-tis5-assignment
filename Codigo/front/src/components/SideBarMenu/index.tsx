import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/currentUser';
import { Room } from '../../models/Room';
import { colors } from '../../styles/themes';
import RoomAvatar from '../RoomAvatar';

import {
  SideMenu,
  SideMenuItem,
  SideMenuLink,
  AvatarWrapper,
  FlexDiv,
  SideMenuMessage,
} from './styles';

const SideBarMenu: React.FC = () => {
  const { user } = useCurrentUser();

  const rooms = (user ? user.groups : []) as Room[];

  return (
    <SideMenu>
      <SideMenuItem>Meus grupos:</SideMenuItem>
      {!rooms.length && (
        <SideMenuMessage>
          <p>Você ainda não participa de nenhum grupo.</p>
          <p>
            <Link to="/app/rooms/search">Busque salas para participar</Link> e
            comece a conversar com seus colegas!
          </p>
        </SideMenuMessage>
      )}

      {rooms.map((room) => (
        <SideMenuLink
          key={room.id}
          to={`/app/rooms/${room.id}`}
          activeStyle={{
            backgroundColor: colors.background,
          }}
        >
          <AvatarWrapper>
            <RoomAvatar room={room} size={32} fontSize={16} />
          </AvatarWrapper>
          <FlexDiv>{room.name}</FlexDiv>
        </SideMenuLink>
      ))}
    </SideMenu>
  );
};

export default SideBarMenu;
