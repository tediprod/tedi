import * as socket from 'socket.io';

import { Server } from 'http';
import { Client } from '../models/Client';
import { Room } from '../models/Room';

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

            socket.on("askForGameList", function () {
                // Build a custom array of rooms to avoid infinite buffer recursion
                let rooms = Room.toArray();
                socket.emit("gameList", { rooms: rooms })
            });

            socket.on("initRoom", function (data: any) {
                let username = data.username;
                let roomname = data.roomname;

                client = new Client(socket, username);

                if (!this._game)
                    this._game = new Game('dataTest.json', client);

                // console.log("game : ", this._game);
                let room = client.enterRoom(roomname);

                client.ioClient.to(client.room.name).emit("playerJoin", {user: client.name})

                // Register socket events for client
                console.log("Now registering events...");
                let eventHandlers: any = {
                    system: new System(io, client),
                    chat: new Chat(io, client)
                }

                for (let key in eventHandlers) {
                    let handler = eventHandlers[key].handler;
                    for (let event in handler) {
                        if(socket._events[event] === undefined) {
                            console.log("Registering " + event);
                            socket.on(event, handler[event]);
                        } else {
                            console.log(event + " is already registered.");
                        }
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

                socket.on('getData', function (data: any) {
                    // console.log('oui?');
                    this._game.sendData();
                });

                // With all that said and done, tell client to go to game page
                io.to(socket.id).emit("navigateTo", { routeName: "/Game" });
                io.to(socket.id).emit('initClient', { pseudo: username });
                let rooms = Room.toArray();
                socket.broadcast.emit("gameList", { rooms: rooms })
            });

        })
    }
}