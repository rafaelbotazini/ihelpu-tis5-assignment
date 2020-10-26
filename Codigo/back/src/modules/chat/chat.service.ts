import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(@Inject('CHAT_MQ_CLIENT') private client: ClientProxy) {}

  public sendMessage(roomId: string, message: string, userId: string): void {
    this.client.emit('chats_queue', `${userId} :: ${message}`);
  }

  public printMessage(message: string): void {
    console.log(message);
  }
}
