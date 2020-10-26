import Stomp from 'stompjs';

const ws = new WebSocket(`${process.env.REACT_APP_WEBSTOMP_URL}`);
const client = Stomp.over(ws);
client.debug = (str) => {
  process.env.NODE_ENV === 'development' && console.log(str);
};
export default client;
