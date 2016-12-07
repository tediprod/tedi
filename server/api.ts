import * as http from "http";
import * as express from "express";
import * as socket from "socket.io";

import { Router } from "./config/http-router/router";

class Server {
    public api: express.Application;
    private server: http.Server;
    private io: any;

    private port: number;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        // Create express api
        this.api = express();

        // Configure api
        this.config();

        // Set up router
        this.router();

        // Create server
        this.server = http.createServer(this.api);
        
        // Set up websockets
        this.sockets();

        // Listen to the voices
        this.listen();
    }

    private config(): void {
        // 8000 by default
        this.port = process.env.PORT || 8000;
    }

    private router(): void {
        let router: Router = new Router();
        this.api.use("/", router.getRouter());
    }

    private sockets(): void {
        this.io = socket(this.server);
    }

    private listen(): void {
        this.server.listen(this.port);

        // Error handler
        this.server.on("error", error => {
            console.log("An error occured : ", error);
        })

        // Success handler
        this.server.on("listening", () => {
            console.log('==> Listening at http://localhost:%s.', this.port);            
        });
    }
}

let server: any = Server.bootstrap();
export = server['api'];