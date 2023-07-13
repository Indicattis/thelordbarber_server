import express from 'express';
import db from '../../db.js';

const router = express.Router();

router.get('/', (req, res) => {
    const cliente = req.query.cliente; // Obtém o valor do parâmetro day da query
    const sql = `SELECT * FROM agendamentos WHERE cliente = '${cliente}'`; // Usando o valor de day na consulta SQL
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

export default router;