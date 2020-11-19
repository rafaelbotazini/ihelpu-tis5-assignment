import React, { useReducer, createContext, useContext } from 'react';
import { Room } from '../../models/Room';
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
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <UserGroupsContext.Provider
      value={{
        rooms: state,
        addRoom: (room) => dispatch(roomAdded(room)),
        updateRoom: (room) => dispatch(roomUpdated(room)),
        removeRoom: (id) => dispatch(roomRemoved(id)),
        setRooms: (rooms) => dispatch(roomsFetched(rooms)),
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
