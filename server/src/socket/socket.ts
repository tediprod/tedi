import * as socket from 'socket.io';

import { Server } from 'http';

import { Client } from './client';

export class SocketIoServer {
    private io: any;
    private client: Client;

    constructor(server: Server) {
        this.io = socket(server);

        this.defineSockets();
    }

    private defineSockets(): void {
        let io = this.io;
        let _client = this.client;

        io.on('connect', function (client: any) {
            _client = new Client(client.id, "Richard" + Client.getAllClients().length);

            console.log(`${_client.getName()}(${_client.getSocket()}) is connected.`);

            io.emit('server test', { test: "hello client" });

            client.on('client test', function (data: any) {
                console.log(client.id);
                console.log("test received : ", data["test"]);
                io.to(client.id).emit('received client test', { test: "I successfully retrieved your exhilarating data, client !" })
            })

            client.on('disconnect', function () {
                console.log("Thank you for playing, client !");
                Client.removeClient(_client);
                _client = null;
            })

            client.on('get all sockets', function(){
                io.emit('here they are', { sockets: Client.getAllClients()})
            })
        })
    }
}