import React from 'react';
import { FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../services/auth';
import { Sider, Wrapper, ContentWrapper, Content, BottomMenu } from './styles';

import Navbar from '../Navbar';
import BottomLink from '../BottomLink';
const Layout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      <ContentWrapper>
        <Sider>
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
