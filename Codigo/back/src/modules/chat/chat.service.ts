import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RmqMessage } from 'common/interfaces/RmqMessage';
import { TextMessagePayload } from './payload/text-message.payload';

@Injectable()
export class ChatService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  /**
   * Sends a text message to a chat room
   * @param roomId The id of the room to which the message must be sent to
   * @param message The text message
   * @param userId The id of the user that is sending the message
   */
  public sendTextMessage(
    roomId: string,
    message: string,
    userId: string,
  ): void {
    this.amqpConnection.publish('chat_messages', 'send_text.' + roomId, {
      userId,
      message,
    });
  }

  /**
   * Handles text messages sent to a room topic.
   *
   * The topic is in the format send_text.\<roomId\>
   *
   * @param payload Chat message sent from client
   * @param message RabbitMQ message info
   */
  @RabbitSubscribe({
    exchange: 'chat_messages',
    routingKey: 'send_text.*',
    queue: 'server_messages',
  })
  public async handleChatMessage(
    payload: TextMessagePayload,
    message: RmqMessage,
  ): Promise<void> {
    const { routingKey } = message.fields;
    const roomId = routingKey.substr(routingKey.indexOf('.') + 1);

    // TODO: persist message to database
    console.log(
      ` [RMQ] ::::::: CHAT :: ${roomId} :: ${payload.userId} :: ${payload.message}`,
    );
  }
}
