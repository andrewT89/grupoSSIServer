import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';
import { Asignature } from '../models/asignature.model';

const router = Router();

router.get('/', (req: Request, res: Response) => {

    const query = `SELECT * FROM asignatura`;

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
                asignaturas: results
            });
        }
    });
});

router.get('/:id', (req: Request, res: Response) => {

    const ID = req.params.id;
    const scapeValue = MySQL.instance.cnn.escape(ID)
    const query = `
        SELECT * 
        FROM asignatura
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
                asignatura: results[0]
            });
        }
    });
});

router.post('/save', (req: Request, res: Response) => {

    let body = req.body;
    const asignature = new Asignature(
        body.nombre,
        body.estado
    );
    const query = `
        INSERT INTO asignatura (nombre, estado) VALUES (${MySQL.instance.cnn.escape(asignature.nombre)}, ${asignature.estado})
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
                message: 'Registro Creado Exitosamente'
            });
        }
    });

});

router.post('/delete/:id', (req: Request, res: Response) => {

    const ID = req.params.id;
    const scapeValue = MySQL.instance.cnn.escape(ID);
    const query = `
        DELETE FROM asignatura 
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