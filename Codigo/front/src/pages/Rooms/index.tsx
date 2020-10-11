import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import EditRoomPage from './EditRoomPage';
import RoomsListingPage from './RoomsListingPage';

const Rooms: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/app/rooms">
        <RoomsListingPage />
      </Route>
      <Route exact path="/app/rooms/create">
        <CreateRoomPage />
      </Route>
      <Route exact path="/app/rooms/edit/:id">
        <EditRoomPage />
      </Route>
    </Switch>
  );
};

export default Rooms;
