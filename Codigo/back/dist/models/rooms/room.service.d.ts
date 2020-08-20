import { Model } from 'mongoose';
import { Room } from './interface/room.interface';
export declare class RoomsService {
    private readonly roomModel;
    constructor(roomModel: Model<Room>);
    create(room: Room): Promise<Room>;
    findAll(): Promise<Room[]>;
    findById(id?: string): Promise<Room | null>;
}
