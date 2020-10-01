import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/auth';
import Button from '../Button';
import { Sider, Wrapper, Content, BottomMenu, MenuBrand } from './styles';

import logo from '../../assets/users.svg';
const Layout: React.FC = ({ children }) => {
  const history = useHistory();

  const handleSignout = (): void => {
    logout();
    history.push('/signin');
  };

  return (
    <Wrapper>
      <Sider>
        <MenuBrand onClick={() => history.push('/')}>
          <img src={logo} height="40" />
          <h2>IHelpU</h2>
        </MenuBrand>
        <BottomMenu>
          <Button onClick={handleSignout}>
            <FaSignOutAlt /> Sair
          </Button>
        </BottomMenu>
      </Sider>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Layout;
