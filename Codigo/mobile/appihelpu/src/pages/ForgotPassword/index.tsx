import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  Container,
  Title,
  SubTitle,
  GoBackButton,
  GoBackButtonText,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo@128px.png';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

const ForgotPassword: React.FC = () => {
  /**
   * utilizamos as ref para manipular o form de maneira direta e não por um evento
   */
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleGoBackLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
              <Title>Recuperar Senha</Title>
            </View>

            <Form ref={formRef} onSubmit={() => console.log('')}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Recuperar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <GoBackButton onPress={handleGoBackLogin}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <GoBackButtonText>Voltar ao logon</GoBackButtonText>
      </GoBackButton>
    </>
  );
};

export default ForgotPassword;
