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
        SELECT * FROM genero
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
        FROM genero
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
router.post('/delete/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    const query = `
        DELETE FROM genero 
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
