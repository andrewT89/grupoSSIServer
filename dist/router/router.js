"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
//Instancia unica de la base de datos
mysql_1.default.instance;
const router = express_1.Router();
router.get('/asignatura', (req, res) => {
    const query = `SELECT * FROM asignatura`;
    mysql_1.default.executeQuery(query, (err, asignatures) => {
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
                asignatures
            });
        }
    });
});
router.get('/asignatura/:id', (req, res) => {
    const ID = req.params.id;
    const scapeValue = mysql_1.default.instance.cnn.escape(ID);
    const query = `
        SELECT * 
        FROM asignatura
        WHERE id = ${scapeValue}
    `;
    mysql_1.default.executeQuery(query, (err, asignatures) => {
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
                asignatures
            });
        }
    });
});
exports.default = router;
