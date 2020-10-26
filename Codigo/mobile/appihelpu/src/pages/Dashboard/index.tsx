import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  UserDataList,
  UserDataListTitle,
} from './styles';

import { useAuth } from '../../context/AuthContext';

import UserInfo from '../../components/UserInfo';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();
  const { user, signOut } = useAuth();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user && user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri: 'https://api.adorable.io/avatars/72/abott@adorable.png',
            }}
          />
        </ProfileButton>
      </Header>

      <UserDataList>
        <UserDataListTitle>Sobre</UserDataListTitle>

        <UserInfo>Id: {user.id}</UserInfo>
        <UserInfo>Nome: {user.name}</UserInfo>
        <UserInfo>Username: {user.username}</UserInfo>
        <UserInfo>Universidade: {user.university}</UserInfo>
        <UserInfo>E-mail: {user.email}</UserInfo>
      </UserDataList>

      <Button
        onPress={() => {
          navigate('Profile');
        }}
      >
        Editar dados
      </Button>
      <Button onPress={signOut}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
