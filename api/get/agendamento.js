// clientes.js
const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM agendamentos WHERE id = ?`;
    
    db.query(sql, [id], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Erro.' });
        } else {
            return res.json(results);
        }
      });
});

module.exports = router;
