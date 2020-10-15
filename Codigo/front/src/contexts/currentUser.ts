import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { Profile } from '../models/Profile';

// context value
export type CurrentUser = {
  user?: Profile;
  setUser: Dispatch<SetStateAction<Profile | undefined>>;
};

// context declaration
export const CurrentUserContext = createContext<CurrentUser>({
  setUser: () => {
    return;
  },
});

// use this hook to get and update context value
export const useCurrentUser = (): CurrentUser => {
  const context = useContext(CurrentUserContext);
  return context;
};
