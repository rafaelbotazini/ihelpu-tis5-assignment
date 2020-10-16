import React, { useEffect } from 'react';
import { FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { Sider, Wrapper, ContentWrapper, Content, BottomMenu } from './styles';
import Navbar from '../Navbar';
import BottomLink from '../BottomLink';
import SideBarMenu from '../SideBarMenu';
import { useCurrentUser } from '../../contexts/currentUser';
import api from '../../services/api';
import { logout } from '../../services/auth';

const Layout: React.FC = ({ children }) => {
  const { user, setUser } = useCurrentUser();

  useEffect(() => {
    if (!user) {
      api.profile.getCurrent().then(setUser).catch(console.log);
    }
  }, [setUser, user]);

  const handleLogout = (): void => {
    setUser(undefined);
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
        <Content>{children}</Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Layout;
