import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Profile } from '../../models/Profile';

// context value
export type CurrentUser = {
  user?: Profile;
  setUser: Dispatch<SetStateAction<Profile | undefined>>;
};

const defaultValue = {
  setUser: () => {
    return;
  },
};

// context declaration
export const CurrentUserContext = createContext<CurrentUser>(defaultValue);

// use this hook to get and update context value
export const useCurrentUser = (): CurrentUser => {
  const [user, setUser] = useState<Profile | undefined>();
  return { user, setUser };
};
