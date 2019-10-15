import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';
import { Profesor } from '../models/profesor.model';
const router = Router();

router.get('/', (req: Request, res: Response) => {

    const query = `
        SELECT * FROM profesor
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
                profesores: results
            });
        }
    });
});

router.get('/:id', (req: Request, res: Response) => {

    const ID = req.params.id;
    const scapeValue = MySQL.instance.cnn.escape(ID)
    const query = `
        SELECT * 
        FROM profesor
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
                profesor: results[0]
            });
        }
    });
});

router.post('/save', (req: Request, res: Response) => {

    let body = req.body;
    const pModel = new Profesor(
        body.nombres,
        body.apellidos,
        body.edad,
        body.cedula,
        body.telefono,
        body.genero_id,
        body.estado
    );
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
            ${MySQL.instance.cnn.escape(pModel.cedula)},
            ${pModel.telefono},
            ${MySQL.instance.cnn.escape(pModel.genero_id)}
            ${pModel.estado}
            )
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
        DELETE FROM profesor 
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