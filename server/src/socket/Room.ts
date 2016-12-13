import { SocketIoServer } from './SocketIoServer';
import { Client } from './Client';

export class Room {
    public static rooms: Array<Room> = [];
    private _name: string;

    constructor(name: string) {
        this._name = name;

        Room.rooms.push(this);
    }

    public static createRoom(client: Client, name: string): any {
        let room = Room.findRoom(name);

        if (room) {
            console.log(`${room.name} already exists. Joining...`);
            return Room.joinRoom(client, name);
        } else {
             room = new Room(name)
            console.log(`Successfully created ${room.name}.`);
            return Room.joinRoom(client, name);
        }

    }

    public static findRoom(name: string): any {
        let rooms = Room.rooms;
        for (let i = 0; i < rooms.length; i++) {
            console.log(rooms[i]);
            if (rooms[i].name == name) {
                return rooms[i];
            }
        }

        return false;
    }

    public static joinRoom(client: Client, name: string): Object {
        let room = Room.findRoom(name);
        if (room) {
            console.log(room.name);
            client.ioClient.join(room.name);
            console.log(`Successfully joined ${room.name}`);
            return { "status": "200", "message": `Successfully joined ${room.name}`, "data": room }
        } else {
            console.log(`Room ${name} does not exist.`);
            return { "status": "404", "message": `Room ${name} does not exist.` };
        }
    }

    public get name(): string {
        return this._name;
    }

    public set name(val: string) {
        this._name = val;
    }

}