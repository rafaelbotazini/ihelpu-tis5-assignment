import { Room } from '../../models/Room';

export type RoomAction = {
  type: string;
  payload: Room | Room[] | string;
};

// action names
const ROOMS_FETCHED = 'ROOMS_FETCHED';
const ROOM_ADDED = 'ROOM_ADDED';
const ROOM_UPDATED = 'ROOM_UPDATED';
const ROOM_REMOVED = 'ROOM_REMOVED';

// action creators
export const roomAdded = (room: Room): RoomAction => ({
  type: ROOM_ADDED,
  payload: room,
});

export const roomUpdated = (room: Room): RoomAction => ({
  type: ROOM_UPDATED,
  payload: room,
});

export const roomRemoved = (id: string): RoomAction => ({
  type: ROOM_REMOVED,
  payload: id,
});

export const roomsFetched = (rooms: Room[]): RoomAction => ({
  type: ROOMS_FETCHED,
  payload: rooms,
});

// reducer
export const reducer = (state: Room[], action: RoomAction): Room[] => {
  switch (action.type) {
    case ROOMS_FETCHED: {
      return action.payload as Room[];
    }
    case ROOM_ADDED: {
      return state.concat([action.payload as Room]);
    }
    case ROOM_UPDATED: {
      const payload = action.payload as Room;
      const idx = state.findIndex((r) => r.id === payload.id);
      const updated = state.concat([]);
      const update = { ...state[idx], ...payload };
      updated.splice(idx, 1, update);
      return updated;
    }
    case ROOM_REMOVED: {
      const idx = state.findIndex((r) => r.id === (action.payload as string));
      const updated = state.concat([]);
      updated.splice(idx, 1);
      return updated;
    }
    default:
      throw new Error('Unown rooms action name.');
  }
};
