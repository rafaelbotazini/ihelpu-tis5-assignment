import Stomp from 'stompjs';

const ws = new WebSocket(`${process.env.REACT_APP_WEBSTOMP_URL}`);
const client = Stomp.over(ws);

export default client;
