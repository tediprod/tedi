import { AbstractHandler } from './AbstractHandler';

export class Chat extends AbstractHandler {
    constructor(io: any, client: any){
        super(io, client);

        this.handler = this.conf();
    }

    private conf(): Object {
        let client = this.client;
        let io = this.io;

        function newChatMessage(data:any): void {
            console.log("New message : ", data);
            console.log("client room name: ", client.room.name);
            io.to(client.ioClient.id).emit("sendMessageSuccess", data);
            // client.ioClient.broadcast.emit("newChatMessage", data);
            client.ioClient.to(client.room.name).emit('newChatMessage', data);
        }

        return {
            newChatMessage: newChatMessage.bind(this)
        }
    }
}