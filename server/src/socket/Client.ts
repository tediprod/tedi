import { SocketIoServer } from './SocketIoServer';

export class Client {
    private static clients:Array<Client> = [];
    private _ioClient: any;
    private _name: string;

    constructor(ioClient: number, name: string){
        this._ioClient = ioClient;
        this._name = name;

        Client.clients.push(this);
    }

    public get ioClient(): any{
        return this._ioClient;
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