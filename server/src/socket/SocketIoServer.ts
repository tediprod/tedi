import * as socket from 'socket.io';

import { Server } from 'http';
import { Client } from './Client';

import { System } from './eventHandlers/System';
import { Chat } from './eventHandlers/Chat';

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
            _client = new Client(client, "Richard" + Client.getAllClients().length);

            let eventHandlers: any = {
                system: new System(io, _client),
                chat: new Chat(io, _client)
            }

            console.log(`${_client.name}(${_client.ioClient.id}) is connected.`);

            for(let key in eventHandlers){
                let handler = eventHandlers[key].handler;
                for(let event in handler){
                    client.on(event, handler[event]);
                }
            }

            io.to(_client.ioClient.id).emit('serverTestData', { test: "hello client"});
            setTimeout(function(){io.to(_client.ioClient.id).emit('mytest', {truc: "yoooooooo"})},1000);
        })
    }
}