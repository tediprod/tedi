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
            let roomName = "provisionary name";
            
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

            console.warn(chalk.red(`${_client.name}(${_client.ioClient.id}) is connected.`));
            console.log("Name : " + _client.name);
            console.log("Room : ");
            console.log("   name : " + _client.room.name);
            console.log("   clients : ");
            for(let e = 0; e < _client.room.clients.length; e++){
                let clientLoop = _client.room.clients[e];
                console.log("       client " + e + " : ");
                console.log("           id : " + clientLoop.ioClient.id);
                console.log("           name : " + clientLoop.name);
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