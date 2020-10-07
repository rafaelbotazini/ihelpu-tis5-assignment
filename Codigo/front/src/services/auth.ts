import jwt from 'jsonwebtoken';

export const TOKEN_KEY = '@iHelpU-Token';

export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (token) {
    const data = jwt.decode(token, { json: true });
    if (data) {
      const expiration = Number(data['exp']);
      return Date.now() < expiration * 1000;
    }
  }
  return false;
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const login = (token: string): void =>
  localStorage.setItem(TOKEN_KEY, token);

export const logout = (): void => localStorage.removeItem(TOKEN_KEY);
