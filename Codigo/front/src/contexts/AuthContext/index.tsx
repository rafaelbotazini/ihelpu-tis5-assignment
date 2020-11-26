import React, { createContext, useState, useContext, useEffect } from 'react';

import { Credentials } from '../../models/Credentials';
import { Profile } from '../../models/Profile';
import { UpdateUserPayload } from '../../models/UpdateUserPayload';
import api from '../../services/api';

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
      const token = localStorage.getItem('@iHelpU-Token');
      const user = localStorage.getItem('@iHelpU-User');

      if (token && user) {
        setData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (credentials: Credentials): Promise<void> => {
    try {
      const { token } = await api.auth
        .signIn(credentials)
        .then((response) => response.data);

      localStorage.setItem('@iHelpU-Token', token);

      const user = await api.profile.getCurrent();

      localStorage.setItem('@iHelpU-User', JSON.stringify(user));

      setData({ token, user });
    } catch (e) {
      setData({} as AuthState);
    }
  };

  const signOut = async (): Promise<void> => {
    localStorage.removeItem('@iHelpU-Token');
    localStorage.removeItem('@iHelpU-User');
    setData({} as AuthState);
  };

  const updateUser = async (payload: UpdateUserPayload): Promise<void> => {
    const user = await api.profile.update(payload);
    localStorage.setItem('@iHelpU-User', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  };

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
