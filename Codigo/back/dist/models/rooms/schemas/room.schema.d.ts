import { Document } from 'mongoose';
export declare class Room extends Document {
    nome: string;
    mensagens: string;
    usuarios: string[];
}
export declare const RoomSchema: import("mongoose").Schema<any>;
