import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ChatPage from './ChatPage';
import CreateRoomPage from './CreateRoomPage';
import EditRoomPage from './EditRoomPage';
import SearchRoomPage from './SearchRoomPage';

const Rooms: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/app/rooms">
        <Redirect to="/app/rooms/search" />
      </Route>
      <Route exact path="/app/rooms/create">
        <CreateRoomPage />
      </Route>
      <Route exact path="/app/rooms/search">
        <SearchRoomPage />
      </Route>
      <Route exact path="/app/rooms/edit/:id">
        <EditRoomPage />
      </Route>
      <Route exact path="/app/rooms/:id">
        <ChatPage />
      </Route>
    </Switch>
  );
};

export default Rooms;
