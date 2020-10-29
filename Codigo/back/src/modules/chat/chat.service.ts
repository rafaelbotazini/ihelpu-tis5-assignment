import { Injectable } from '@nestjs/common';
import {
  AmqpConnection,
  Nack,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { RmqMessage } from 'common/interfaces/RmqMessage';
import { TextMessagePayload } from './payload/text-message.payload';
import { RoomService } from 'modules/room/room.service';
import { IMessage } from 'modules/message/message.model';

@Injectable()
export class ChatService {
  constructor(
    private amqpConnection: AmqpConnection,
    private roomService: RoomService,
  ) {}

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
  ): Promise<Nack | undefined> {
    const { routingKey } = message.fields;
    const roomId = routingKey.substr(routingKey.indexOf('.') + 1);

    try {
      // process message (add timestamp)
      const textMessage: IMessage = {
        text: payload.message,
        from: payload.userId,
        createdAt: new Date(),
      };

      // add to room messages
      await this.roomService.addMessage(roomId, textMessage);

      // publish processed message to subscribed clients
      this.amqpConnection.publish(
        'chat_messages',
        'message.' + roomId,
        textMessage,
      );
    } catch {
      return new Nack(true);
    }
  }
}
