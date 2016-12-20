import { AbstractHandler } from './AbstractHandler';
import { Client } from '../Client';

export class System extends AbstractHandler {
    constructor(io: any, client: any) {
        super(io, client);

        this.handler = this.conf();
    }

    private conf(): Object {
        function testSuccessResponse(data: any): void {
            console.log("test data received : ", data);
            this.io.to(this.client.ioClient.id).emit('testDataReceived', { test: `I successfully retrieved your exhilarating data, ${this.client.name} !` })
        }

        function disconnectResponse(): void {
            this.client.disconnect();
        }

        function getAllSockets(): void {
            this.io.to(this.client.ioClient.id).emit('allSocketsSent', { sockets: Client.getAllClients() })
        }

        return {
            disconnect: disconnectResponse.bind(this),
            testData: testSuccessResponse.bind(this),
            getAllSockets: getAllSockets.bind(this)
        }
    }
}