import React, { useContext, useEffect } from 'react';
import { FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { Sider, Wrapper, ContentWrapper, Content, BottomMenu } from './styles';
import Navbar from '../Navbar';
import BottomLink from '../BottomLink';
import SideBarMenu from '../SideBarMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../services/api';
import { logout } from '../../services/auth';
import { UserGroupsContext } from '../../contexts/UserGroupsContext';
import { Room } from '../../models/Room';
import { ConnectionStatusContext } from '../../contexts/ConnectionStatusContext';

const Layout: React.FC = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);
  const userGroups = useContext(UserGroupsContext);
  const { connected } = useContext(ConnectionStatusContext);

  useEffect(() => {
    if (!currentUser.user) {
      api.profile
        .getCurrent()
        .then((userData) => {
          currentUser.setUser(userData);
          userGroups.setRooms(userData.groups as Room[]);
        })
        .catch(console.log);
    }
  }, [currentUser, userGroups]);

  const handleLogout = (): void => {
    currentUser.setUser(undefined);
    logout();
  };

  return (
    <Wrapper>
      <Navbar />
      <ContentWrapper>
        <Sider>
          <SideBarMenu />
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
              onClick={handleLogout}
            />
          </BottomMenu>
        </Sider>
        <Content>{connected ? children : 'Conectando...'}</Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Layout;
