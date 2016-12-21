import { SocketIoServer } from '../socket/SocketIoServer';
import { Room } from './Room';

/**
 * Client class.
 * 
 * Client instance of Socket.IO / name of the client / room the client is part of
 */
export class Client {
    private static clients: Array<Client> = [];
    private _ioClient: any;
    private _name: string;
    private _room: Room;

    constructor(ioClient: number, name: string) {
        this._ioClient = ioClient;
        this._name = name;

        Client.clients.push(this);
    }

    public enterRoom(roomname: string): Room {
        let room = Room.initRoom(this, roomname);
        this.room = room;
        return this.room;
    }

    public leaveRoom(): void {
        let _this = this;
        _this.room.leaveRoom(_this);
        _this.room.isEmpty().then(function (bool:boolean) {
            if (bool) {
                _this.room.remove();
            };

            let rooms = Room.toArray();

            _this.ioClient.server.emit("gameList", { rooms: rooms })

            console.log(`${_this.name}(${_this.ioClient.id}) has disconnected.`);
            _this.remove();
        })
    }

    public disconnect(): void {
        console.log("this is disconnect");
        this.leaveRoom();
    }

    public get ioClient(): any {
        return this._ioClient;
    }

    public get name(): string {
        return this._name;
    }


    public get room(): Room {
        return this._room;
    }

    public set room(val: Room) {
        this._room = val;
    }

    public static getAllClients(): Array<Client> {
        return Client.clients;
    }

    public remove(): null {
        Client.clients.splice(Client.clients.indexOf(this), 1);
        return null;
    }
}