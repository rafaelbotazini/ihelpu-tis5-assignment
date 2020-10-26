import { UpdateUserPayload } from '../../models/UpdateUserPayload';
import { Profile } from '../../models/Profile';
import apiRequest from '../apiRequest';

export const updateProfile = (user: UpdateUserPayload): Promise<Profile> =>
  apiRequest.patch('/profile', user).then((response) => response.data);

export const getCurrentUser = (): Promise<Profile> =>
  apiRequest.get('/request/user').then(({ data }) => data);
