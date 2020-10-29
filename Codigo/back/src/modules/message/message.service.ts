import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from './message.model';

export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<IMessage>,
  ) {}

  public async addTextMessage(
    roomId: string,
    fromId: string,
    text: string,
  ): Promise<IMessage> {
    return await this.messageModel.create({ roomId, fromId, text });
  }
}
