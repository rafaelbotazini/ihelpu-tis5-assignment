import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ROOM_UPDATES } from 'common/constants/exchanges';
import { IProfile } from 'modules/profile/profile.model';
import { EditRoomPayload } from 'modules/room/payload/EditRoomPayload';
import { UserJoinedNotificationPayload } from './payload/user-joined.payload';

@Injectable()
export class NotificationService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  /**
   * Notifies that one or more properties of a room has changed.
   *
   * Topic: updated.[roomId]
   * @param room the changed room (will be sent as the notification message)
   */
  public notifyRoomChanged(roomId: string, update: EditRoomPayload): void {
    this.amqpConnection.publish(ROOM_UPDATES, 'updated.' + roomId, update);
  }

  /**
   * Notifies that a user has left the group.
   *
   * Topic: user_left.[roomId]
   * @param roomId the id of the room to be notified
   * @param userId the id of the user that has left the group (will be sent as the notification message)
   */
  public notifyUserLeft(roomId: string, userId: string): void {
    this.amqpConnection.publish(ROOM_UPDATES, 'user_left.' + roomId, userId);
  }

  /**
   * Notifies that the group admin changed.
   *
   * Topic: admin_changed.[roomId]
   * @param roomId the id of the room to be notified
   * @param userId the id of the new admin of the group (will be sent as the notification message)
   */
  public notifyRoomAdminChanged(roomId: string, userId: string): void {
    this.amqpConnection.publish(
      ROOM_UPDATES,
      'admin_changed.' + roomId,
      userId,
    );
  }

  /**
   * Notifies that a user has joined the group.
   *
   * @param roomId the id of the room to be notified
   * @param user the user that has joined the group (will be sent as the notification message)
   */
  public notifyUserJoined(
    roomId: string,
    payload: UserJoinedNotificationPayload,
  ): void {
    this.amqpConnection.publish(ROOM_UPDATES, 'user_joined.' + roomId, payload);
  }

  /**
   * Notifies that a room member has changed one or more of their properties.
   *
   * @param user the member of the group that was updated (will be sent as the notification message)
   */
  public notifyRoomUserUpdated(user: IProfile): void {
    user.groups.forEach((group) => {
      this.amqpConnection.publish(
        ROOM_UPDATES,
        'user_updated.' + group.id,
        user,
      );
    });
  }
}
