import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RmqMessage } from 'common/interfaces/RmqMessage';
import { TextMessagePayload } from './payload/text-message.payload';
import { MessageService } from 'modules/message/message.service';
import { CHAT_MESSAGES, ROOM_UPDATES } from 'common/constants/exchanges';
import { IProfile } from 'modules/profile/profile.model';
import { IRoom } from 'modules/room/room.model';

@Injectable()
export class ChatService {
  constructor(
    private amqpConnection: AmqpConnection,
    private messageService: MessageService,
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
    this.amqpConnection.publish(CHAT_MESSAGES, 'send_text.' + roomId, {
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
    exchange: CHAT_MESSAGES,
    routingKey: 'send_text.*',
    queue: 'server_messages',
  })
  public async handleChatMessage(
    payload: TextMessagePayload,
    rmqMessage: RmqMessage,
  ): Promise<void> {
    const { routingKey } = rmqMessage.fields;
    const roomId = routingKey.substr(routingKey.indexOf('.') + 1);
    try {
      // persist new message
      const message = await this.messageService.addTextMessage(
        roomId,
        payload.userId,
        payload.message.trim(),
      );

      // publish message to subscribed clients
      this.amqpConnection.publish(
        CHAT_MESSAGES,
        'message.' + roomId,
        message.toJSON(),
      );
    } catch (error) {
      console.log(error);
    }
  }

  @RabbitSubscribe({
    exchange: ROOM_UPDATES,
    routingKey: '#',
    queue: 'server_room_control',
  })
  public async handleRoomUpdates(
    payload: string | IProfile | IRoom,
    rmqMessage: RmqMessage,
  ): Promise<void> {
    const { routingKey } = rmqMessage.fields;
    console.log([ROOM_UPDATES, routingKey].join('::'), payload);
  }
}
