import { SocketIoServer } from './SocketIoServer';
import { Room } from './Room';

export class Client {
    private static clients:Array<Client> = [];
    private _ioClient: any;
    private _name: string;
    private _room: Room;

    constructor(ioClient: number, name: string){
        this._ioClient = ioClient;
        this._name = name;

        Client.clients.push(this);
    }

    public joinRoom(id: string): Object {
        return Room.joinRoom(this, id);
    }

    public get ioClient(): any{
        return this._ioClient;
    }
    
    public get name() : string {
        return this._name;
    }

    
    public get room() : Room {
        return this._room;
    }
    
    public set room(val: Room) {
        this._room = val;
    }

    public static getAllClients(){
        return Client.clients;
    }

    public remove(): null{
        Client.clients.splice(Client.clients.indexOf(this), 1);
        return null;
    }
}