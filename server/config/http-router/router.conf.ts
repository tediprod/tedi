import * as express from "express";
import * as fs from "fs";

let routes = express.Router();

routes.get('/', function (req: express.Request, res: express.Response) {
    readFile(function (err: any, data: any) {
        res.json(data);
    })
});

routes.get('/:id', function (req: express.Request, res: express.Response) {
    readFile(function (err: any, data: any) {
        let locations = JSON.parse(data);
        let location = locations['location' + req.params.id];

        if (location) {
            res.json(location);
        } else {
            res.status(422);
            res.json({ error: "No location with this id" });
        }
    })
});

function readFile(callback: any): void {
    fs.readFile(__dirname + "/../../../test.json", "utf8", function (err, data) {
        callback(err, data);
    });
}

export = routes;