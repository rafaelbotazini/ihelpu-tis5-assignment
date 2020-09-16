import React, { useState } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FaUniversity, FaUserCircle } from 'react-icons/fa';

import { SignUpForm } from '../../models/forms/SignUpForm';
import { login } from '../../services/auth';
import { signUp } from '../../services/api/auth';

import logoImg from '../../assets/users.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';

const SignUp: React.FC = () => {
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

    console.log('credentials', user);

    signUp(user)
      .then((res) => {
        login(res.data.token);
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
