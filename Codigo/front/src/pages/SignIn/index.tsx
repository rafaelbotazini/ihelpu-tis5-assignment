import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/users.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="iHelpU" />
      <h4>iHelpU</h4>

      <form>
        <h1>Faça seu logon</h1>

        <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
  </Container>
);

export default SignIn;
