import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApplicationSchema } from 'src/common/schemas/configurations/ApplicationSchema';

@ApplicationSchema()
export class Room extends Document {
  readonly id?: string;

  @Prop({ required: true })
  nome: string;

  @Prop()
  mensagens: string[]; // referenciar o modelo

  @Prop()
  usuarios: string[]; // referenciar o usuários
}

export const RoomSchema = SchemaFactory.createForClass(Room);
