// clientes.js
const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT nome FROM barbeiros WHERE id = ?`;
    
    db.query(sql, [id], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao verificar nome do barbeiro.' });
        } else {
          if (results.length > 0) {
            const barberName = results[0].nome;
            res.status(200).json({ nome: barberName });
          } else {
            res.status(200).json({ nome: '' });
          }
        }
      });
});


module.exports = router;