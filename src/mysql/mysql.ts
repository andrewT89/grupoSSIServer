import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;
    cnn: mysql.Connection;
    conecction: boolean = false;

    constructor() {
        console.log("Clse MYSQL inicializada");
        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'andres',
            password : '1234',
            database : 'grupossi'
          });

          this.getConnectDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static executeQuery(query: string, callback: Function) {
        debugger;
        this._instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log("Error en la consulta");
                console.error(err);
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro no existe');
            } else {
                callback(null, results);
            }
            
        });
    }

    private getConnectDB() {
        debugger;
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
            }

            this.conecction = true;
            console.log('Data Base Online!!!!...');
        });
    }
}