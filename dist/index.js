"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = require("./router");
const body_parser_1 = __importDefault(require("body-parser"));
//Instancia unica de la base de datos
const mysql_1 = __importDefault(require("./mysql/mysql"));
mysql_1.default.instance;
const server = server_1.default.init(3000);
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use(body_parser_1.default.json());
//Enable cors
server.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
});
server.start(() => {
    console.log('Run service at port 3000');
});
server.app.use('/api/asignatura', router_1.asignatura);
server.app.use('/api/alumno', router_1.alumno);
server.app.use('/api/profesor', router_1.profesor);
server.app.use('/api/genero', router_1.genero);
exports.default = server;
