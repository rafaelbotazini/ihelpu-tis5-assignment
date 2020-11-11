import { createContext, Dispatch, SetStateAction, useState } from 'react';
import client from '../../services/wsRequest';

type ConnectionStatus = {
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
};

export const ConnectionStatusContext = createContext<ConnectionStatus>({
  connected: false,
  setConnected: () => {
    return;
  },
});

export const useConnectionStatus = (): ConnectionStatus => {
  const [connected, setConnected] = useState<boolean>(false);

  client.connect(
    'guest',
    'guest',
    () => setConnected(true),
    () => setConnected(false),
  );

  return { connected, setConnected };
};
