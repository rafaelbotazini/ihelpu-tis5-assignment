import { AxiosResponse } from 'axios';
import { Credentials } from '../../models/Credentials';
import apiRequest from '../apiRequest';

interface AuthResponse {
  token: string;
}

export const signIn = (
  user: Credentials,
): Promise<AxiosResponse<AuthResponse>> =>
  apiRequest.post('/auth/signin', user);
