const express = require ('express');
const db = require ('../../db.js');
const dayjs = require ('dayjs');
const cors = require ('cors');

const app = express();

app.use(cors());

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

module.exports = router;
