




const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();



router.get('/:barberId/:day', (req, res) => {
    const { barberId, day } = req.params;
  
    const sqlQuery = `
      SELECT * FROM horarios
      WHERE id_barbeiro = ? AND day = ? ORDER BY hour ASC
    `;
  
    db.query(sqlQuery, [barberId, day], (error, result) => {
      if (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
  
      res.json(result);
    });
});

module.exports = router;