"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conecction = false;
        console.log("Clse MYSQL inicializada");
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'andres',
            password: '1234',
            database: 'grupossi'
        });
        this.getConnectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query, callback) {
        debugger;
        this._instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Error en la consulta");
                console.error(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    getConnectDB() {
        debugger;
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            this.conecction = true;
            console.log('Data Base Online!!!!...');
        });
    }
}
exports.default = MySQL;
