// barbeiros.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
    const sql = `SELECT * FROM barbeiros`; // Usando o valor de day na consulta SQL
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

export default router;
