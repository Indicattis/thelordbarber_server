




import express from 'express';
import db from '../../db.js';

const router = express.Router();



router.get('/:barberId/:day', (req, res) => {
    const { barberId, day } = req.params;
  
    const sqlQuery = `
      SELECT * FROM agendamentos
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

export default router;