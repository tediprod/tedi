import { SocketIoServer } from './SocketIoServer';

export class Client {
    private static clients:Array<Client> = [];
    private _socket: number;
    private _name: string;

    constructor(socket: number, name: string){
        this._socket = socket;
        this._name = name;

        Client.clients.push(this);
    }

    public get socket(): number{
        return this._socket;
    }
    
    public get name() : string {
        return this._name;
    }
    

    public static getAllClients(){
        return Client.clients;
    }

    public remove(): null{
        Client.clients.splice(Client.clients.indexOf(this), 1);
        return null;
    }
}