import { AbstractHandler } from './AbstractHandler';
import { Client } from '../Client';

export class System extends AbstractHandler {
    constructor(io: any, client: any) {
        super(io, client);

        this.handler = this.conf();
    }

    private conf(): Object {
        function testSuccessResponse(data: any) {
            console.log("test data received : ", data);
            this.io.to(this.client.socket).emit('testDataReceived', { test: `I successfully retrieved your exhilarating data, ${this.client.name} !` })
        }

        function disconnectResponse() {
            console.log(`${this.client.name}(${this.client.socket}) has disconnected.`);
            this.client = this.client.remove();
        }

        function getAllSockets() {
            this.io.to(this.client.socket).emit('allSocketsSent', { sockets: Client.getAllClients() })
        }

        return {
            disconnect: disconnectResponse.bind(this),
            testData: testSuccessResponse.bind(this),
            getAllSockets: getAllSockets.bind(this)
        }
    }
}