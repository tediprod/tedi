export class AbstractHandler {
    private _io: any;
    private _client: any;
    private _handler: Object;

    constructor(io: any, client: any) {
        this._io = io;
        this._client = client;
    }

    public get io(): any {
        return this._io;
    }


    public get client(): any {
        return this._client;
    }

    
    public get handler() : Object {
        return this._handler;
    }
    
    public set handler(obj : Object) {
        this._handler = obj;
    }

    public set client(val: any) {
        this._client = val;
    }
    

}