"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const profesor_model_1 = require("../models/profesor.model");
const router = express_1.Router();
router.get('/', (req, res) => {
    const query = `
        SELECT * FROM profesor
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
                profesores: results
            });
        }
    });
});
router.get('/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    const query = `
        SELECT * 
        FROM profesor
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
                profesor: results[0]
            });
        }
    });
});
router.post('/save', (req, res) => {
    let body = req.body;
    const pModel = new profesor_model_1.Profesor(body.nombres, body.apellidos, body.edad, body.cedula, body.telefono, body.genero_id, body.estado);
    const query = `
        INSERT INTO asignatura (
            nombres, 
            apellidos, 
            edad, 
            cedula, 
            telefono, 
            genero_id, 
            estado) 
        VALUES (
            ${pModel.nombres},
            ${pModel.apellidos},
            ${pModel.edad},
            ${mysql_1.default.instance.cnn.escape(pModel.cedula)},
            ${pModel.telefono},
            ${mysql_1.default.instance.cnn.escape(pModel.genero_id)}
            ${pModel.estado}
            )
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
                message: 'Registro Creado Exitosamente'
            });
        }
    });
});
router.post('/delete/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    const query = `
        DELETE FROM profesor 
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
