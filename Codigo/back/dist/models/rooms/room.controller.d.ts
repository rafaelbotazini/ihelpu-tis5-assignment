import { RoomsService } from './room.service';
import { Room } from './interface/room.interface';
export declare class RoomController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    index(): Promise<Room[]>;
    create(body: Room): Promise<Room>;
    show(req: any, res: any): Promise<Room>;
}
