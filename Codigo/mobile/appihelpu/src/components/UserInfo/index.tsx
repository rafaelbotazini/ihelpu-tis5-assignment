import React from 'react';
import { Container, Text } from './styles';

const UserInfo: React.FC = ({ children }) => (
  <Container>
    <Text>{children}</Text>
  </Container>
);

export default UserInfo;
