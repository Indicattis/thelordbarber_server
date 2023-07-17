// clientes.js
const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT phone FROM clientes WHERE id = ?`;
    
    db.query(sql, [id], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao verificar número de telefone.' });
        } else {
          if (results.length > 0) {
            const catchPhone = results[0].name;
            res.status(200).json({ catchPhone });
          } else {
            res.status(200).json({ catchPhone: '' });
          }
        }
      });
});

module.exports = router;
