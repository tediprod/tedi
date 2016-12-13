import * as socket from 'socket.io';

import { Server } from 'http';
import { Client } from './Client';

import { System } from './eventHandlers/System';

export class SocketIoServer {
    private io: any;
    private client: Client;

    constructor(server: Server) {
        this.io = socket(server);

        this.defineSocketEvents();
    }

    private defineSocketEvents(): void {
        let io = this.io;
        let _client = this.client;

        io.on('connect', function (client: any) {
            _client = new Client(client.id, "Richard" + Client.getAllClients().length);
            // test envoie de prop
            var _partyName: string = "bonjour";

            let eventHandlers: any = {
                system: new System(io, _client)
            }

            console.log(`${_client.name}(${_client.socket}) is connected.`);

            for(let key in eventHandlers){
                let handler = eventHandlers[key].handler;
                for(let event in handler){
                    client.on(event, handler[event]);
                }
            }

            io.to(_client.socket).emit('serverTestData', { test: "hello client"});
            setTimeout(function(){io.to(_client.socket).emit('mytest', {truc: "yoooooooo"})},1000);
        })
    }
}