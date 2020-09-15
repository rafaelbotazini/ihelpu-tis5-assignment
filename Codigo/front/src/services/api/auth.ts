import { AxiosResponse } from 'axios';
import { Credentials } from '../../models/Credentials';
import { SignUpForm } from '../../models/forms/SignUpForm';
import apiRequest from '../apiRequest';

interface AuthResponse {
  token: string;
}

export const signIn = (
  credentials: Credentials,
): Promise<AxiosResponse<AuthResponse>> =>
  apiRequest.post('/auth/signin', credentials);

export const signUp = (
  user: SignUpForm,
): Promise<AxiosResponse<AuthResponse>> =>
  apiRequest.post('/auth/register', user);
