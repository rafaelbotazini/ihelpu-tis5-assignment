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
} from './styles';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>Matheus</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri: 'https://api.adorable.io/avatars/72/abott@adorable.png',
            }}
          />
        </ProfileButton>
      </Header>

      <Button
        onPress={() => {
          navigate('Profile');
        }}
      >
        Editar dados
      </Button>
      <Button
        onPress={() => {
          console.log('sair');
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
