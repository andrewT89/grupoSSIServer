"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const asignature_model_1 = require("../models/asignature.model");
const router = express_1.Router();
router.get('/', (req, res) => {
    const query = `SELECT * FROM asignatura`;
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
                asignaturas: results
            });
        }
    });
});
router.get('/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    const query = `
        SELECT * 
        FROM asignatura
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
                asignatura: results[0]
            });
        }
    });
});
router.post('/save', (req, res) => {
    let body = req.body;
    const asignature = new asignature_model_1.Asignature(body.nombre, body.estado);
    const query = `
        INSERT INTO asignatura (nombre, estado) VALUES (${mysql_1.default.instance.cnn.escape(asignature.nombre)}, ${asignature.estado})
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
        DELETE FROM asignatura 
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
