import React from 'react';
import { FiMail, FiUser, FiArrowLeft } from 'react-icons/fi';

import { FaUniversity, FaUserCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const Profile: React.FC = () => {
  return (
    <Container>
      <header>
        <div>
          <Link to="/app">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <form onSubmit={() => console.log('submit')}>
          <h1>Meu perfil</h1>

          <Input
            required
            name="name"
            type="text"
            icon={FaUserCircle}
            placeholder="Nome"
          />
          <Input
            required
            name="username"
            type="text"
            icon={FiUser}
            placeholder="Username"
          />
          <Input
            required
            name="university"
            type="text"
            icon={FaUniversity}
            placeholder="Universidade"
          />
          <Input
            required
            name="email"
            type="email"
            icon={FiMail}
            placeholder="E-mail"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </form>
      </Content>
    </Container>
  );
};

export default Profile;
