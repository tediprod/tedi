import * as socket from 'socket.io';

import { Server } from 'http';
import { Client } from './Client';
import { Room } from './Room';

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
            let roomName = "Provisionary Room";
            
            _client = new Client(client, "Richard" + Client.getAllClients().length);
            // let room = Room.rooms[0];
            // if(room){
            //     _client.joinRoom(Room.rooms[0].name)
            //     _client.room = room;
            // } else {
            //     room = Room.createRoom(_client, "testRoom")['data'];
            //     _client.room = room;
            // }

            let room = Room.createRoom(_client, roomName)['data'];
            _client.room = room;

            let eventHandlers: any = {
                system: new System(io, _client),
                chat: new Chat(io, _client)
            }

            var chalk = require('chalk');
            let room2 = _client.room;

            console.warn(chalk.red(`${_client.name}(${_client.ioClient.id}) is connected.`));
            console.log("Name : " + _client.name);
            console.log("Room : ");
            console.log("   name : " + room2.name);
            console.log("   clients : ");
            for(let e = 0; e < io.in(room2.name).clients.length; e++){
                let clientLoop = io.in(room2.name).clients();
                console.log("       client " + e + " : ");
                console.log("           id : " + clientLoop.id);
                console.log("           name : " + clientLoop.name);
                console.log(clientLoop.clients()[e]);
            }



            for(let key in eventHandlers){
                let handler = eventHandlers[key].handler;
                for(let event in handler){
                    client.on(event, handler[event]);
                }
            }
        })
    }
}