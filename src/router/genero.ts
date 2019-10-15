import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';
const router = Router();


router.get('/', (req: Request, res: Response) => {

    const query = `
        SELECT * FROM genero
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
        FROM genero
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

router.post('/delete/:id', (req: Request, res: Response) => {

    const ID = req.params.id;
    const scapeValue = MySQL.instance.cnn.escape(ID);
    const query = `
        DELETE FROM genero 
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