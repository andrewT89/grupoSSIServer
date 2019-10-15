import express = require('express');
import path = require('path');

export default class Server {

    public app: express.Application;
    public port: number;

    constructor(Port: number) {
        this.port = Port;
        this.app = express();
    }

    static init (Port: number) {
        return new Server(Port);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    start(callback: Function):void {
        this.app.listen(this.port, callback());
        this.publicFolder();
    }
}