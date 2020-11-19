import React, { useContext, useEffect } from 'react';
import { FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { Sider, Wrapper, ContentWrapper, Content, BottomMenu } from './styles';
import Navbar from '../Navbar';
import BottomLink from '../BottomLink';
import SideBarMenu from '../SideBarMenu';
import { UserGroupsContext } from '../../contexts/UserGroupsContext';
import { Room } from '../../models/Room';
import { ConnectionStatusContext } from '../../contexts/ConnectionStatusContext';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = ({ children }) => {
  const auth = useAuth();
  const userGroups = useContext(UserGroupsContext);
  const { connected } = useContext(ConnectionStatusContext);

  useEffect(() => {
    if (auth.user) {
      userGroups.setRooms(auth.user.groups as Room[]);
    }
  }, [auth, userGroups]);

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
