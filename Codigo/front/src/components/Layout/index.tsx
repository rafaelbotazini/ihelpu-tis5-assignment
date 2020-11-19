import React, { useContext, useEffect } from 'react';
import { FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { Sider, Wrapper, ContentWrapper, Content, BottomMenu } from './styles';
import Navbar from '../Navbar';
import BottomLink from '../BottomLink';
import SideBarMenu from '../SideBarMenu';
import { ConnectionStatusContext } from '../../contexts/ConnectionStatusContext';
import { useAuth } from '../../contexts/AuthContext';
import { useGroups } from '../../contexts/UserGroupsContext';
import api from '../../services/api';

const Layout: React.FC = ({ children }) => {
  const auth = useAuth();
  const userGroups = useGroups();
  const { connected } = useContext(ConnectionStatusContext);

  useEffect(() => {
    if (auth.user) {
      api.profile.getRooms().then(userGroups.setRooms);
    }
  }, [auth.user, userGroups.setRooms]);

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
              onClick={auth.signOut}
            />
          </BottomMenu>
        </Sider>
        <Content>{connected ? children : 'Conectando...'}</Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Layout;
