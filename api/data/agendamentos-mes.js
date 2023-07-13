import express from 'express';
import db from '../../db.js';
import dayjs from 'dayjs';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
    }));

const router = express.Router();

router.get('/:month', (req, res) => {
  const { month } = req.params;
  const currentMonth = dayjs().month() + 1;
  
  const sqlQuery = `
    SELECT * FROM agendamentos
    WHERE MONTH(day) = ?
  `;
  
  db.query(sqlQuery, [month], (error, result) => {
    if (error) {
      console.error("Erro ao consultar o banco de dados:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  
    res.json(result);
  });
});

export default router;
