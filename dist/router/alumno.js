"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/', (req, res) => {
    const query = `
        SELECT * FROM alumno
        `;
    mysql_1.default.executeQuery(query, (err, results) => {
        debugger;
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                alumnos: results
            });
        }
    });
});
router.get('/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    const query = `
        SELECT * 
        FROM alumno
        WHERE id = ${scapeValue}
    `;
    mysql_1.default.executeQuery(query, (err, results) => {
        debugger;
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                alumno: results[0]
            });
        }
    });
});
router.post('/save', (req, res) => {
    let body = req.body;
    let properties = {
        nombres: body.nombres,
        apellidos: body.apellidos,
        edad: body.edad,
        f_nacimiento: body.f_nacimiento,
        cedula: body.cedula,
        telefono: body.telefono,
        genero_id: body.genero_id,
        estado: body.estado
    };
    const query = 'INSERT INTO alumno SET ?';
    mysql_1.default.instance.cnn.query(query, properties, (err, results) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                message: 'Registro Creado Exitosamente'
            });
        }
    });
});
router.put('/update/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    let body = req.body;
    let properties = [
        body.nombres,
        body.apellidos,
        body.edad,
        body.f_nacimiento,
        body.cedula,
        body.telefono,
        body.genero_id,
        body.estado,
        scapeValue
    ];
    const query = 'UPDATE alumno set nombres =?,apellidos =?,edad =?,f_nacimiento =?,cedula =?,telefono =?,genero_id =?,estado =? WHERE id =?';
    mysql_1.default.instance.cnn.query(query, properties, (err, results) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                message: 'Registro Actualizado Exitosamente',
                alumno: results
            });
        }
    });
});
router.post('/delete/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    const query = `
        DELETE FROM alumno 
        WHERE id = ${scapeValue}
        `;
    mysql_1.default.executeQuery(query, (err, results) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                message: 'Registro Eliminado Exitosamente'
            });
        }
    });
});
exports.default = router;
