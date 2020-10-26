import Stomp from 'stompjs';

const ws = new WebSocket(`${process.env.REACT_APP_WEBSTOMP_URL}`);
const client = Stomp.over(ws);

client.connect(
  'guest',
  'guest',
  () => {
    console.log('client.connected', client.connected);
    client.send(
      '/exchange/chat_messages/send_text.42',
      { 'content-type': 'text/plain' },
      JSON.stringify({
        userId: 'rafael@reactjs.client',
        message: 'Olá :)',
      }),
    );
  },
  console.error,
);

export default client;
