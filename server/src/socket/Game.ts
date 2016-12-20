import { SocketIoServer } from './SocketIoServer';
import { Client } from './Client';
var fs = require('fs');

export class Game{
    private file: string;
    private data:any;
    private client: Client;

    constructor(file: string, client: any){
        this.file = file;
        this.client = client;
        fs.readFile(this.file, this.loaded.bind(this));
    }

    loaded(error: Error, data: any){
        console.log("data :",JSON.parse(data.toString()));
        this.data = JSON.parse(data.toString());
    }
    sendData(){
        this.client.ioClient.emit('clues', JSON.stringify(this.data));        
    }
}