import { AxiosResponse } from 'axios';
import { Credentials } from '../../models/Credentials';
import { SignUpPayload } from '../../models/SignUpPayload';
import apiRequest from '../apiRequest';

interface AuthResponse {
  token: string;
}

export const signIn = (
  credentials: Credentials,
): Promise<AxiosResponse<AuthResponse>> =>
  apiRequest.post('/auth/login', credentials);

export const signUp = (
  user: SignUpPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  apiRequest.post('/auth/register', user);

export default { signIn, signUp };
