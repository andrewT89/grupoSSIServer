import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';
import { Alumno } from '../models/alumno.model';
import bodyParser = require('body-parser');
const router = Router();


router.get('/', (req: Request, res: Response) => {

    const query = `
        SELECT * FROM alumno
        `;

    MySQL.executeQuery(query, (err: any, results: Object[]) => {
        debugger;
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                alumnos: results
            });
        }
    });
});

router.get('/:id', (req: Request, res: Response) => {

    const ID = req.params.id;
    const scapeValue = MySQL.instance.cnn.escape(ID);
    const query = `
        SELECT * 
        FROM alumno
        WHERE id = ${scapeValue}
    `;

    MySQL.executeQuery(query, (err: any, results: Object[]) => {
        debugger;
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                alumno: results[0]
            });
        }
    });
});

router.post('/save', (req: Request, res: Response) => {

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
    MySQL.instance.cnn.query(query, properties, (err: any, results: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                message: 'Registro Creado Exitosamente'
            });
        }
    });

});

router.put('/update/:id', (req: Request, res: Response) => {

    const ID = req.params.id;
    const scapeValue = MySQL.instance.cnn.escape(ID);
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

    MySQL.instance.cnn.query(query, properties, (err: any, results: Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                message: 'Registro Actualizado Exitosamente',
                alumno: results
            });
        }
    });

});

router.post('/delete/:id', (req: Request, res: Response) => {

    const ID = req.params.id;
    const scapeValue = MySQL.instance.cnn.escape(ID);
    const query = `
        DELETE FROM alumno 
        WHERE id = ${scapeValue}
        `;

    MySQL.executeQuery(query, (err: any, results: Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                message: 'Registro Eliminado Exitosamente'
            });
        }
    });

});

export default router;