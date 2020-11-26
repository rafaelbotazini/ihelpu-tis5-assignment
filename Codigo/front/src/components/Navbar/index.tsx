import React from 'react';
import { useHistory } from 'react-router-dom';
import { Brand, NavWrapper, Profile, Container } from './styles';
import { Link } from 'react-router-dom';

import logo from '../../assets/users.svg';
import userLogo from '../../assets/Subtract.png';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = ({ children }) => {
  const { user } = useAuth();
  const history = useHistory();

  return (
    <>
      <NavWrapper>
        <Brand onClick={() => history.push('/')}>
          <div>
            <img src={logo} height="40" alt="iHelpU logo" />
            <span>IHelpU</span>
          </div>
        </Brand>
        {children}
      </NavWrapper>

      <Container>
        <Profile>
          <img src={userLogo} alt="Usuário" />

          <div>
            <span>Bem-vindo,</span>
            <Link to="/app/profile">
              <strong>{user && user.name}</strong>
            </Link>
          </div>
        </Profile>
      </Container>
    </>
  );
};

export default Navbar;
