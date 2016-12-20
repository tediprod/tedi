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
            // let roomName = "Provisionary_Room";

            // _client = new Client(client, "Richard" + Client.getAllClients().length);
            // let room = Room.rooms[0];
            // if(room){
            //     _client.joinRoom(Room.rooms[0].name)
            //     _client.room = room;
            // } else {
            //     room = Room.createRoom(_client, "testRoom")['data'];
            //     _client.room = room;
            // }

            // let room = Room.createRoom(_client, roomName)['data'];
            // _client.room = room;

            client.on("askForGameList", function () {
                // Build a custom array of rooms to avoid infinite buffer recursion
                let rooms: Array<{name: string, id: string}> = [];

                Room.rooms.forEach(function(room){
                    rooms.push({name: room.name, id: room.ioRoom.id});
                })
                client.emit("receiveGameList", { rooms: rooms })
            });

            client.on("initRoom", function (data: any) {
                let username = data.username;
                let roomname = data.roomname;

                _client = new Client(client, username);

                let room = _client.initRoom(roomname);

                // Register socket events for client
                let eventHandlers: any = {
                    system: new System(io, _client),
                    chat: new Chat(io, _client)
                }

                for (let key in eventHandlers) {
                    let handler = eventHandlers[key].handler;
                    for (let event in handler) {
                        client.on(event, handler[event]);
                    }
                }

                var chalk = require('chalk');

                console.warn(chalk.red(`${_client.name}(${_client.ioClient.id}) is connected.`));
                console.log("Name : " + _client.name);
                console.log("Id : " + _client.ioClient.id);
                console.log("Room : ");
                console.log("   name : " + _client.room.name);
                console.log("   clients : ");
                io.of('/').in(_client.room.name).clients(function (err: any, clients: any) {
                    console.log(clients);
                });

                // With all that said and done, tell client to go to game page
                io.to(_client.ioClient.id).emit("navigateTo", { routeName: "/Game" });
            })
        })
    }
}