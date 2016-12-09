import { SocketIoServer } from './socket';

export class Client {
    private static clients:Array<Client> = [];
    private socket: number;
    private name: string;

    constructor(socket: number, name: string){
        this.socket = socket;
        this.name = name;

        Client.clients.push(this);
    }

    public getSocket(): number{
        return this.socket;
    }
    
    public getName() : string {
        return this.name;
    }
    

    public static getAllClients(){
        return Client.clients;
    }

    public static removeClient(client: Client){
        console.log(Client.clients);
        Client.clients.splice(Client.clients.indexOf(client), 1);
    }
}