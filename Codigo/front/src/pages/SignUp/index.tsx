import React, { useState } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FaUniversity, FaUserCircle } from 'react-icons/fa';

import { SignUpForm } from '../../models/forms/SignUpForm';
import api from '../../services/api';

import logoImg from '../../assets/users.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignUp: React.FC = () => {
  const auth = useAuth();
  const history = useHistory<{ pathname: string }>();
  const location = useLocation<{ from: { pathname: string } }>();

  const [user, setUser] = useState<SignUpForm>({
    name: '',
    username: '',
    email: '',
    password: '',
    university: '',
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setUser((c) => ({ ...c, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    api.auth
      .signUp(user)
      .then(() => auth.signIn(user))
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.push(from);
      })
      .catch(() => alert('Ocorreu algum erro, tente novamente.'));
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="iHelpU" />
        <h4>iHelpU</h4>

        <form onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>

          <Input
            required
            name="name"
            value={user.name}
            onChange={handleChange}
            type="text"
            icon={FaUserCircle}
            placeholder="Nome"
          />
          <Input
            required
            name="username"
            value={user.username}
            onChange={handleChange}
            type="text"
            icon={FiUser}
            placeholder="Username"
          />
          <Input
            required
            name="university"
            value={user.university}
            onChange={handleChange}
            type="text"
            icon={FaUniversity}
            placeholder="Universidade"
          />
          <Input
            required
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            icon={FiMail}
            placeholder="E-mail"
          />
          <Input
            required
            name="password"
            value={user.password}
            onChange={handleChange}
            minLength={8}
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </form>

        <Link to="signin">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
