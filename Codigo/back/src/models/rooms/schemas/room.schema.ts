import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop()
  mensagens: string; // referenciar o modelo

  @Prop()
  usuarios: string[]; // referenciar o usuários
}

export const RoomSchema = SchemaFactory.createForClass(Room);