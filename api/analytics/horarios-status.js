const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.get('/', (req, res) => {
    const { id } = req.query;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Mês atual começa em 0, por isso somamos 1
    const currentYear = currentDate.getFullYear();
  
    const sqlQuery = `SELECT COUNT(*) AS quantidadeLinhas FROM sua_tabela WHERE id = ? AND MONTH(day) = ? AND YEAR(day) = ?`;
    const values = [id, currentMonth, currentYear];
  
    db.query(sqlQuery, values, (err, results) => {
      if (err) {
        console.error('Erro na consulta:', err);
        res.status(500).json({ error: 'Erro na consulta' });
      } else {
        const quantidadeLinhas = results[0].quantidadeLinhas;
        res.json({ quantidadeLinhas });
      }
    });
  });


module.exports = router;
