import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/auth';

const HomePage: React.FunctionComponent = () => {
  const history = useHistory();

  const handleSignoutClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    logout();
    history.push('/signin');
  };

  return (
    <div>
      <h1>Home page</h1>
      <a href="#" onClick={handleSignoutClick}>
        Sair
      </a>
    </div>
  );
};

export default HomePage;
