import Stomp from 'stompjs';

const ws = new WebSocket(`${process.env.REACT_APP_WEBSTOMP_URL}`);
const client = Stomp.over(ws);

client.connect(
  'guest',
  'guest',
  () => {
    console.log('client.connected', client.connected);
    client.send(
      '/amq/queue/chats_queue',
      { 'content-type': 'text/plain' },
      JSON.stringify({ data: 'TESTE', pattern: 'chats_queue' }),
    );
  },
  console.error,
);

export default client;
