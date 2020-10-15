import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../services/auth';

import {
  Sider,
  Wrapper,
  ContentWrapper,
  Content,
  BottomMenu,
  SideMenu,
  SideMenuItem,
} from './styles';

import Navbar from '../Navbar';
import BottomLink from '../BottomLink';
import { Room } from '../../models/Room';
import api from '../../services/api';

const Layout: React.FC = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    api.profile.getRooms().then(setRooms);
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <ContentWrapper>
        <Sider>
          <SideMenu>
            <SideMenuItem>Meus grupos:</SideMenuItem>
            {!rooms.length && (
              <SideMenuItem>Nenhum grupo encontrado</SideMenuItem>
            )}

            {rooms.map((room) => (
              <SideMenuItem style={{ margin: '0 20px' }} key={room.id}>
                {room.name}
              </SideMenuItem>
            ))}
          </SideMenu>
          <BottomMenu>
            <BottomLink
              to="/app/rooms/search"
              name="Procurar"
              icon={FaSearch}
            />
            <BottomLink
              to="/app/rooms/create"
              name="Criar grupo"
              icon={FaPlus}
            />
            <BottomLink
              to="/signin"
              name="Sair"
              icon={FaSignOutAlt}
              onClick={logout}
            />
          </BottomMenu>
        </Sider>
        <Content>{children}</Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Layout;
