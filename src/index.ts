import Server from "./server/server";
import {asignatura, alumno, profesor, genero} from "./router";
import bodyParser from "body-parser";

//Instancia unica de la base de datos
import MySQL from "./mysql/mysql";
MySQL.instance;

const server = Server.init(3000);

server.app.use(bodyParser.urlencoded({extended: false}));
server.app.use(bodyParser.json());

//Enable cors
server.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
});

server.start(() => {
    console.log('Run service at port 3000');
});

server.app.use('/api/asignatura', asignatura);
server.app.use('/api/alumno', alumno);
server.app.use('/api/profesor', profesor);
server.app.use('/api/genero', genero);

export default server;