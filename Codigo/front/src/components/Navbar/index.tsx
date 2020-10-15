import React from 'react';
import { useHistory } from 'react-router-dom';
import { Brand, NavWrapper } from './styles';

import logo from '../../assets/users.svg';

const Navbar: React.FC = ({ children }) => {
  const history = useHistory();

  return (
    <NavWrapper>
      <Brand onClick={() => history.push('/')}>
        <div>
          <img src={logo} height="40" />
          <span>IHelpU</span>
        </div>
      </Brand>
      {children}
    </NavWrapper>
  );
};

export default Navbar;
