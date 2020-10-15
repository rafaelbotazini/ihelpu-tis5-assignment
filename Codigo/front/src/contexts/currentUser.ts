import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { Profile } from '../models/Profile';

export type CurrentUser = {
  user?: Profile;
  setUser: Dispatch<SetStateAction<Profile | undefined>>;
};

export const CurrentUserContext = createContext<CurrentUser>({
  setUser: () => {
    return;
  },
});

export const useCurrentUser = (): CurrentUser => {
  const context = useContext(CurrentUserContext);
  return context;
};
