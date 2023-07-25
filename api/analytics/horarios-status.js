const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

// ...

router.get('/', (req, res) => {
    const { id, month } = req.query; // Obtem o valor do mês enviado pelo Axios
    const currentDate = new Date();
    const currentMonth = parseInt(month) || currentDate.getMonth() + 1; // Usa o valor enviado ou o mês atual
    const currentYear = currentDate.getFullYear();
    
    const sqlQuery = `SELECT COUNT(*) AS quantidadeLinhas FROM horarios WHERE id_barbeiro = ? AND MONTH(day) = ? AND YEAR(day) = ?`;
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
  
  // ...
  


module.exports = router;
