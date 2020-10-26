import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import apiAuth from '../services/api/auth';
import { Credentials } from '../models/Credentials';
import { Profile } from '../models/Profile';
import { getCurrentUser, updateProfile } from '../services/api/profile';
import { UpdateUserPayload } from '../models/UpdateUserPayload';

interface AuthState {
  token: string;
  user: Profile;
}

interface AuthContextData {
  user: Profile;
  loading: boolean;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
  updateUser(user: UpdateUserPayload): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@iHelpU:Token',
        '@iHelpU:User',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { token } = await apiAuth
      .signIn({ email, password })
      .then((response) => response.data);

    await AsyncStorage.setItem('@iHelpU:Token', token);

    const user = await getCurrentUser();

    await AsyncStorage.setItem('@iHelpU:User', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@iHelpU:Token', '@iHelpU:User']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (payload: UpdateUserPayload) => {
      const user = await updateProfile(payload);
      await AsyncStorage.setItem('@iHelpU:User', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
