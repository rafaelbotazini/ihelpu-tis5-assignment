import React, { useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Credentials } from '../../models/Credentials';
import logoImg from '../../assets/users.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { useAuth } from '../../contexts/AuthContext';

type LocationState = {
  from: {
    pathname: string;
  };
};

const SignIn: React.FC = () => {
  const auth = useAuth();
  const history = useHistory<{ pathname: string }>();
  const location = useLocation<LocationState>();

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setCredentials((c) => ({ ...c, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    auth
      .signIn(credentials)
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.push(from);
      })
      .catch(() => alert('Email ou senha incorretos.'));
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="iHelpU" />
        <h4>iHelpU</h4>

        <form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            icon={FiMail}
            placeholder="E-mail"
          />
          <Input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <Link to="/forgotpassword">Esqueci minha senha</Link>
        </form>

        <Link to="signup">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
    </Container>
  );
};

export default SignIn;
