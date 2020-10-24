import React, { useReducer, createContext } from 'react';
import { Room } from '../../models/Room';
import {
  roomAdded,
  reducer,
  roomRemoved,
  roomsFetched,
  roomUpdated,
} from './reducer';

export type UserGroups = {
  rooms: Room[];
  addRoom: (room: Room) => void;
  removeRoom: (id: string) => void;
  updateRoom: (room: Room) => void;
  setRooms: (id: Room[]) => void;
};

export const UserGroupsContext = createContext<UserGroups>({
  rooms: [],
  addRoom: () => {
    return;
  },
  updateRoom: () => {
    return;
  },
  removeRoom: () => {
    return;
  },
  setRooms: () => {
    return;
  },
});

export const UserGroupsContextProvider: React.FC = ({ children }) => {
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
