import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FaUniversity, FaUserCircle } from 'react-icons/fa';

import logoImg from '../../assets/users.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="iHelpU" />
      <h4>iHelpU</h4>

      <form>
        <h1>Faça seu Cadastro</h1>

        <Input name="name" type="text" icon={FaUserCircle} placeholder="Nome" />
        <Input
          name="username"
          type="text"
          icon={FiUser}
          placeholder="Username"
        />
        <Input
          name="university"
          type="text"
          icon={FaUniversity}
          placeholder="Universidade"
        />
        <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Senha"
        />

        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);

export default SignUp;
