import { SocketIoServer } from './SocketIoServer';
import { Client } from './Client';

/**
 * Room class.
 * 
 * All the methods return the relevant Room instance if it exists.
 * 
 * 
 */
export class Room {
    public static rooms: Array<Room> = [];
    private _name: string;
    private _ioRoom: any;

    constructor(name: string) {
        this._name = name;

        Room.rooms.push(this);
    }

    public static checkRoom(client: Client, name: string): Room {
        let room = Room.findRoom(name);

        return room = room ? room.joinRoom(client, room) : Room.createRoom(client, name);
    }

    public static findRoom(name: string): any {
        let rooms = Room.rooms;

        for(var i = 0; i < rooms.length; i++) {
            if(rooms[i].name == name) {
                return rooms[i];
            }
        }

        return false;
    }

    public static createRoom(client: Client, name: string): Room {
        let room = new Room(name);
        room.ioRoom = client.ioClient.join(name);

        return room;
    }

    public joinRoom(client: Client, room: Room): Room {
        client.ioClient.join(room.name);

        return room;
    }

    public get name(): string {
        return this._name;
    }

    public set name(val: string) {
        this._name = val;
    }


    public get ioRoom(): any {
        return this._ioRoom;
    }


    public set ioRoom(val: any) {
        this._ioRoom = val;
    }

}