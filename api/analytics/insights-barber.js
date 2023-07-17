
const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();

router.get('/:barberId/:nextDays', (req, res) => {
    const { barberId, nextDays } = req.params;
  
    const sqlQuery = `
      SELECT COUNT(*) AS quantidade, SUM(value) AS total
      FROM agendamentos 
      WHERE id_barbeiro = ? AND DATE(day) >= CURDATE() AND DATE(day) <= DATE_ADD(CURDATE(), INTERVAL ? DAY)
    `;
  
    db.query(sqlQuery, [barberId, nextDays], (error, results) => {
      if (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
  
      const quantidadeAgendamentos = results[0]?.quantidade || 0;
      const totalAgendamentos = results[0]?.total || 0;
      res.json({ quantidade: quantidadeAgendamentos, total: totalAgendamentos });
    });
  });

module.exports = router;