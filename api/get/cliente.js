// clientes.js
import express from 'express';
import db from '../../db.js';

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM clientes WHERE id = ?`;
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

export default router;
