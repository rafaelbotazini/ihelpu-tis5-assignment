import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo@128px.png';

import { Container, Title, SubTitle } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <SubTitle>iHelpU</SubTitle>

      <Title>Faça seu logon</Title>

      <Input name="email" icon="mail" placeholder="E-mail"/>
      <Input name="password" icon="lock" placeholder="Senha"/>

      <Button onPress={() => { 
          console.log('passed'); 
        }}>
          Entrar
      </Button>
    </Container>
  );
};

export default SignIn;