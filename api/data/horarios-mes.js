const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.get('/:month/:id_barbeiro', (req, res) => {
  const { month, id_barbeiro } = req.params;
  
  const sqlQuery = `
    SELECT * FROM horarios
    WHERE MONTH(day) = ? AND id_barbeiro = ?
  `;
  
  db.query(sqlQuery, [month, id_barbeiro], (error, result) => {
    if (error) {
      console.error("Erro ao consultar o banco de dados:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  
    res.json(result);
  });
});

module.exports = router;
