import { Client } from './Client';
import { Game } from '../socket/Game';

import { } from '';

/**
 * Room class.
 * 
 * Handles room creation, deletion, joining, leaving...
 */
export class Room {
    public static rooms: Array<Room> = [];
    private _name: string;
    private _ioRoom: any;
    private _clientsCount: number = 0;
    private _game: Game;

    constructor(name: string) {
        this._name = name;

        Room.rooms.push(this);
    }

    public static initRoom(client: Client, name: string): Room {
        let room = Room.findRoom(name);
        return room = room ? room.joinRoom(client) : Room.createRoom(client, name);
    }

    public static findRoom(name: string): any {
        let rooms = Room.rooms;

        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].name == name) {
                return rooms[i];
            }
        }

        return false;
    }

    public static createRoom(client: Client, name: string): Room {
        let room = new Room(name);
        room.ioRoom = client.ioClient.join(name);
        room.clientsCount += 1;
        return room;
    }

    public static toArray(): Array<{name: String, id: String, clientsCount: number}> {
        let rooms: Array<{name: String, id: String, clientsCount: number}> = [];

        Room.rooms.forEach(function(room){
            rooms.push({name: room.name, id: room.ioRoom.id, clientsCount: room.clientsCount});
        })

        return rooms;
    }

    public joinRoom(client: Client): Room {
        client.ioClient.join(this.name);
        this.clientsCount += 1;

        return this;
    }

    public leaveRoom(client:Client): void{
        client.ioClient.leave(this.name);
        console.log("before ", this.clientsCount);
        this.clientsCount -= 1;
        console.log("after ", this.clientsCount);
    }

    public isEmpty(): Promise<{}> {
        let _this = this;
        return new Promise(function (resolve: any, reject: any) {
            let empty: boolean;
            _this.getAllClients().then(function (data: any) {
                if (data.length === 0) {
                    empty = true;
                } else {
                    empty = false;
                }
                
                resolve(empty);
            }).catch(function (err: any) {
                console.log("Promise was rejected : ", err);
            })
        })
    }

    public getAllClients(): Promise<{}> {
        let _this = this;
        return new Promise(function (resolve: any, reject: any) {
            _this.ioRoom.server.in(_this.name).clients(function (err: any, clients: any) {
                resolve(clients);
            });
        });
    }

    public remove() {
        Room.rooms.splice(Room.rooms.indexOf(this), 1);
        console.log(Room.rooms);
    }

    public get name(): string {
        return this._name;
    }

    public set name(val: string) {
        this._name = val;
    }


    public get ioRoom(): any {
        return this._ioRoom;
    }

    public set ioRoom(val: any) {
        this._ioRoom = val;
    }

    public get clientsCount(): any {
        return this._clientsCount;
    }

    public set clientsCount(val: any) {
        this._clientsCount = val;
    }

    public get game(): Game{
        return this._game;
    }
    public set game(val: Game){
        this._game = val;
    }
}