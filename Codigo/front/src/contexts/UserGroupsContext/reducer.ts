import { Room } from '../../models/Room';

export type RoomAction =
  | {
      type: 'ROOM_REMOVED';
      payload: string;
    }
  | {
      type: 'ROOM_ADDED' | 'ROOM_UPDATED';
      payload: Room;
    }
  | {
      type: 'ROOMS_FETCHED';
      payload: Room[];
    };

// action creators
export const roomAdded = (room: Room): RoomAction => ({
  type: 'ROOM_ADDED',
  payload: room,
});

export const roomUpdated = (room: Room): RoomAction => ({
  type: 'ROOM_UPDATED',
  payload: room,
});

export const roomRemoved = (id: string): RoomAction => ({
  type: 'ROOM_REMOVED',
  payload: id,
});

export const roomsFetched = (rooms: Room[]): RoomAction => ({
  type: 'ROOMS_FETCHED',
  payload: rooms,
});

// reducer
export const reducer = (state: Room[], action: RoomAction): Room[] => {
  switch (action.type) {
    case 'ROOMS_FETCHED': {
      return action.payload;
    }
    case 'ROOM_ADDED': {
      return state.concat([action.payload]);
    }
    case 'ROOM_UPDATED': {
      const payload = action.payload;
      const idx = state.findIndex((r) => r.id === payload.id);
      const updated = state.concat([]);
      const update = { ...state[idx], ...payload };
      updated.splice(idx, 1, update);
      return updated;
    }
    case 'ROOM_REMOVED': {
      const idx = state.findIndex((r) => r.id === action.payload);
      const updated = state.concat([]);
      updated.splice(idx, 1);
      return updated;
    }
    default:
      throw new Error('Unknown rooms action name.');
  }
};
