import express from 'express';
import db from '../../db.js';

const router = express.Router();

router.get('/:month', (req, res) => {
  const { month } = req.params;

  const sqlQuery = `
  SELECT DAY(day) AS dia, SUM(value) AS total
  FROM agendamentos
  WHERE MONTH(day) = ?
  GROUP BY DAY(day)
`;


  db.query(sqlQuery, [month], (error, results) => {
    if (error) {
      console.error("Erro ao consultar o banco de dados:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    const agendamentos = results.map((result) => ({
        dia: result.dia,
        total: parseFloat(result.total),
      }));
      
      res.json(agendamentos);
      
  });
});

export default router;
