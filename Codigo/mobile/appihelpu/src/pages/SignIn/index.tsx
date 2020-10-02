import React from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo@128px.png';

import { Container, Title, SubTitle, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

const SignIn: React.FC = () => {
  return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <View>
            <SubTitle>iHelpU</SubTitle>
          </View>
        
          <View>
            <Title>Faça seu logon</Title>
          </View>
          
          <Input name="email" icon="mail" placeholder="E-mail"/>
          <Input name="password" icon="lock" placeholder="Senha"/>

          <Button onPress={() => { 
              console.log('passed'); 
            }}>
              Entrar
          </Button>

          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
      
      <CreateAccountButton onPress={() => {}}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;