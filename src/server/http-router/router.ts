import * as express from "express";

export class Router {
    private router: express.Router;

    constructor() {
        this.router = express.Router();

        // Set up routes
        this.routes();
    }

    private routes() {
        // Set-up sub-routes
        let routes: express.RequestHandler =  require("./router.conf");
        this.router.use("/location", routes);

        // Default error page
        this.router.use(function (req: express.Request, res: express.Response) {
            res.status(404);
            res.json({ error: "Page not found" });
        })
    }

    public getRouter() {
        return this.router;
    }
}