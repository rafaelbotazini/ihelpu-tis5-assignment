import React from 'react';
import { FiLogIn } from 'react-icons/fi';
 
import logoImg from '../../assets/users.svg';

import { Container, Content } from './styles';

const SignIn: React.FC = () => (

  <Container>

    <Content> 
      <img src={logoImg} alt="iHelpU"/>
      <h4>iHelpU</h4>

      <form>
        <h1>Faça seu logon</h1>

        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>

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