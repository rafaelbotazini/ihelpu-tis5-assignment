import { Document } from 'mongoose';

export interface Room extends Document {
  nome: String;
  mensagens?: String;
  usuarios?: String[];
}