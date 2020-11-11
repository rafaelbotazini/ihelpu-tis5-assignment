export interface RmqMessage {
  fields: {
    exchange: string;
    routingKey: string;
  };
  content: Buffer;
}
