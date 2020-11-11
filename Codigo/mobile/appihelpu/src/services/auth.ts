import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'jwt-decode';

export const TOKEN_KEY = '@iHelpU:Token';

type Token = {
  exp: number;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();

  if (token) {
    const data = jwt<Token>(token);
    if (data) {
      const expiration = Number(data['exp']);
      return Date.now() < expiration * 1000;
    }
  }
  return false;
};

export const getToken = async (): Promise<string | null> => {
  const [token] = await AsyncStorage.multiGet([TOKEN_KEY]);
  return token[1];
};

export const login = (token: string): Promise<void> =>
  AsyncStorage.setItem(TOKEN_KEY, token);

export const logout = (): Promise<void> => AsyncStorage.removeItem(TOKEN_KEY);
