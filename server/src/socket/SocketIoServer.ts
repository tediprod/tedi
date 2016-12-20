import * as socket from 'socket.io';

import { Server } from 'http';
import { Client } from './Client';
import { Room } from './Room';

import { System } from './eventHandlers/System';
import { Chat } from './eventHandlers/Chat';
import { Game } from './Game';

/**
 * SocketIoServer class.
 * 
 * Handles everything related to Socket.IO
 */
export class SocketIoServer {
    private _io: any;
    private _client: Client;
    private _game: Game;

    constructor(server: Server) {
        this._io = socket(server);

        this.initializeSockets();
    }
    private initializeSockets(): void {
        let io = this._io;
        let client = this._client;

        io.on('connect', function (socket: any) {
            // let roomName = "Provisionary_Room";

            // client = new Client(client, "Richard" + Client.getAllClients().length);
            // let room = Room.rooms[0];
            // if(room){
            //     client.joinRoom(Room.rooms[0].name)
            //     client.room = room;
            // } else {
            //     room = Room.createRoom(client, "testRoom")['data'];
            //     client.room = room;
            // }

            // let room = Room.createRoom(client, roomName)['data'];
            // client.room = room;

            socket.on("askForGameList", function () {
                // Build a custom array of rooms to avoid infinite buffer recursion
                let rooms: Array<{ name: string, id: string }> = [];

                Room.rooms.forEach(function (room) {
                    rooms.push({ name: room.name, id: room.ioRoom.id });
                })
                socket.emit("gameList", { rooms: rooms })
            });

            socket.on("initRoom", function (data: any) {
                let username = data.username;
                let roomname = data.roomname;

                client = new Client(socket, username);

                if (!this._game)
                    this._game = new Game('dataTest.json', client);

                console.log("game : ", this._game);
                let room = client.initRoom(roomname);

                // Register socket events for client
                let eventHandlers: any = {
                    system: new System(io, client),
                    chat: new Chat(io, client)
                }

                for (let key in eventHandlers) {
                    let handler = eventHandlers[key].handler;
                    for (let event in handler) {
                        socket.on(event, handler[event]);
                    }
                }

                var chalk = require('chalk');

                console.warn(chalk.red(`${client.name}(${client.ioClient.id}) is connected.`));
                console.log("Name : " + client.name);
                console.log("Id : " + client.ioClient.id);
                console.log("Room : ");
                console.log("   name : " + client.room.name);
                console.log("   clients : ");
                io.of('/').in(client.room.name).clients(function (err: any, clients: any) {
                    console.log(clients);
                });

                io.emit("connectionSuccessful", client.room);
            });

            client.ioClient.on('getData', function (data: any) {
                console.log('oui?');
                this._game.sendData();
            });

            // var chalk = require('chalk');

            // console.warn(chalk.red(`${_client.name}(${_client.ioClient.id}) is connected.`));
            // console.log("Name : " + _client.name);
            // console.log("Id : " + _client.ioClient.id);
            // console.log("Room : ");
            // console.log("   name : " + _client.room.name);
            // console.log("   clients : ");
            // io.of('/').in(_client.room.name).clients(function (err: any, clients: any) {
            //     console.log(clients);
            // });

            // let eventHandlers: any = {
            //     system: new System(io, _client),
            //     chat: new Chat(io, _client)
            // }

            // for (let key in eventHandlers) {
            //     let handler = eventHandlers[key].handler;
            //     for (let event in handler) {
            //         client.on(event, handler[event]);
            //     }
            // }
            // With all that said and done, tell client to go to game page
            io.to(client.ioClient.id).emit("navigateTo", { routeName: "/Game" });
        })
    }
}