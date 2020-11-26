import React, { useReducer, createContext, useContext, useEffect } from 'react';
import { Room } from '../../models/Room';
import api from '../../services/api';
import { useAuth } from '../AuthContext';
import {
  roomAdded,
  reducer,
  roomRemoved,
  roomsFetched,
  roomUpdated,
} from './reducer';

export type UserGroupsContextData = {
  rooms: Room[];
  addRoom: (room: Room) => void;
  removeRoom: (id: string) => void;
  updateRoom: (room: Room) => void;
  setRooms: (id: Room[]) => void;
};

export const UserGroupsContext = createContext<UserGroupsContextData>({
  rooms: [] as Room[],
} as UserGroupsContextData);

export const UserGroupsProvider: React.FC = ({ children }) => {
  const auth = useAuth();
  const [state, dispatch] = useReducer(reducer, []);

  const addRoom = (room: Room): void => dispatch(roomAdded(room));
  const updateRoom = (room: Room): void => dispatch(roomUpdated(room));
  const removeRoom = (id: string): void => dispatch(roomRemoved(id));
  const setRooms = (rooms: Room[]): void => dispatch(roomsFetched(rooms));

  useEffect(() => {
    api.profile.getRooms().then(setRooms);
  }, [auth]);

  return (
    <UserGroupsContext.Provider
      value={{
        rooms: state,
        addRoom,
        updateRoom,
        removeRoom,
        setRooms,
      }}
    >
      {children}
    </UserGroupsContext.Provider>
  );
};

export function useGroups(): UserGroupsContextData {
  const context = useContext(UserGroupsContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  return context;
}
