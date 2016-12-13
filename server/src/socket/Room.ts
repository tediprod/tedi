import { SocketIoServer } from './SocketIoServer';
import { Client } from './Client';

export class Room {
    public static rooms: Array<Room> = [];
    private _clients: Array<Client> = [];
    private _name: string;

    constructor(name: string) {
        this._name = name;

        Room.rooms.push(this);
    }

    public static createRoom(client: Client, name: string): any {
        let room = Room.findRoom(name) || new Room(name);

        console.log(`Successfully created ${room.name}.`);
        Room.joinRoom(client, name);
        return {"status": "200", "message":`Successfully created ${room.name}.`, "data": room};
    }

    public static findRoom(name: string): any {
        let rooms = Room.rooms;
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].name == name){
                return rooms[i];
            }
        }

        return false;
    }

    public static joinRoom(client: Client, name: string): Object {
        let room = Room.findRoom(name);
        if(room){
            client.ioClient.join(room);
            room._clients.push(client);
            console.log(`Successfully joined ${room.name}`);
            return {"status": "200", "message":`Successfully joined ${room.name}`, "data": room}
        } else {
            console.log(`Room ${name} does not exist.`);
            return {"status":"404", "message": `Room ${name} does not exist.`};
        }
    }

    public get name(): string {
        return this._name;
    }

    public get clients(): Array<Client> {
        return this._clients;
    }
    
    public set name(val: string) {
        this._name = val;
    }

}