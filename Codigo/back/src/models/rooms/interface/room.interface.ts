import { Document } from 'mongoose';

export interface Room extends Document {
  nome: string;
  mensagens?: string;
  usuarios?: string[];
}
