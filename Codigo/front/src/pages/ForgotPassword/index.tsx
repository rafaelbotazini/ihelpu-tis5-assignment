import React from 'react';

import { FiMail, FiLogIn } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { Container, Content, AnimationContainer } from './styles';

import logo from '../../assets/users.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const ForgotPassword: React.FC = () => {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="iHelpU" />

          <form onSubmit={() => console.log('submited')}>
            <h1>Recuperar Senha</h1>

            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Button type="submit">Recuperar</Button>
          </form>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
