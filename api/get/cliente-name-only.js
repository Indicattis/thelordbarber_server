// clientes.js
const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT name FROM clientes WHERE id = ?`;
    
    db.query(sql, [id], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao verificar nome do cliente.' });
        } else {
          if (results.length > 0) {
            const clientName = results[0].name;
            res.status(200).json({ name: clientName });
          } else {
            res.status(200).json({ name: '' });
          }
        }
      });
});


module.exports = router;